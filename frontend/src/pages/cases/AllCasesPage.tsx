import { RouteComponentProps } from "@reach/router";
import { Button, Divider, Radio } from "antd";
import CasesTable from "container/all_cases/CasesTable";
import FilterInput from "container/all_cases/FilterInput";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/AllCasesStore";
import UIStore from "stores/UIStore";

interface IAllCasesPageProps extends RouteComponentProps {
  allCasesStore?: CaseStore;
  uiStore?: UIStore;
}

export default inject("allCasesStore", "uiStore")(
  observer(
    class AllCasesPage extends React.Component<IAllCasesPageProps> {
      render() {
        const { allCasesStore, uiStore } = this.props;
        return (
          <div>
            <div>
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
            </div>
            <div>
              <span
                style={{
                  marginBottom: "30px",
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
                <Radio.Group defaultValue="assigned">
                  <Radio.Button value="assigned">Assigned</Radio.Button>
                  <Radio.Button value="all">All</Radio.Button>
                </Radio.Group>
              </span>
            </div>
            <div>
              <CasesTable />
            </div>
          </div>
        );
      }
    }
  )
);
