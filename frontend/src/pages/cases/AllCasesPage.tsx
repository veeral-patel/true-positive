import { RouteComponentProps } from "@reach/router";
import { Button, Divider, Empty, Radio, Typography } from "antd";
import CasesTable from "container/all_cases/CasesTable";
import FilterInput from "container/all_cases/FilterInput";
import { inject, observer } from "mobx-react";
import React from "react";
import AllCasesStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  uiStore?: UIStore;
  allCasesStore?: AllCasesStore;
}

export default inject("allCasesStore", "uiStore")(
  observer(
    class AllCasesPage extends React.Component<Props> {
      componentDidMount() {
        const { allCasesStore } = this.props;
        allCasesStore!.loadCases();
      }

      render() {
        const { uiStore, allCasesStore } = this.props;
        return (
          <div>
            <section>
              <span style={{ display: "inline-block" }}>
                <h2>Cases</h2>
              </span>
              <span style={{ float: "right" }}>
                <Button
                  icon="plus"
                  onClick={() => uiStore!.openCreateCaseModal()}
                >
                  Create Case
                </Button>
              </span>
            </section>
            {allCasesStore!.cases.length === 0 &&
              !allCasesStore!.casesAreLoading && (
                <Empty
                  description={
                    <div style={{ marginTop: "1em" }}>
                      <h2 style={{ fontWeight: "normal" }}>No cases</h2>
                      <Paragraph style={{ fontSize: 16 }}>
                        <a onClick={() => uiStore!.openCreateCaseModal()}>
                          Create a case
                        </a>{" "}
                        to start tracking and collaborating on an investigation.
                      </Paragraph>
                    </div>
                  }
                />
              )}
            {allCasesStore!.cases.length > 0 && (
              <section>
                <div>
                  <span
                    style={{
                      marginBottom: "2em",
                      width: "40%",
                      display: "inline-block"
                    }}
                  >
                    <FilterInput />
                  </span>
                  <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                    <Divider type="vertical" />
                  </span>
                  <span>
                    <Radio.Group
                      value={allCasesStore!.assignedOrAll}
                      onChange={event => {
                        const newFilter = event.target.value;
                        allCasesStore!.setAssignedFilter(newFilter);
                      }}
                    >
                      <Radio.Button value="ASSIGNED">Assigned</Radio.Button>
                      <Radio.Button value="ALL">All</Radio.Button>
                    </Radio.Group>
                  </span>
                </div>
                <div>
                  {allCasesStore!.filteredCases.length === 0 ? (
                    <Empty
                      description={
                        <div style={{ marginTop: "1em" }}>
                          <h3>No cases</h3>
                          <Paragraph>
                            No cases match your filters above
                          </Paragraph>
                        </div>
                      }
                    />
                  ) : (
                    <CasesTable />
                  )}
                </div>
              </section>
            )}
          </div>
        );
      }
    }
  )
);
