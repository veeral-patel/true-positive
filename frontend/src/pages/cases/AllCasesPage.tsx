import { RouteComponentProps } from "@reach/router";
import { Button, PageHeader } from "antd";
import ActionsDropdown from "container/all_cases/ActionsDropdown";
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
            <PageHeader
              title={<h2>Cases</h2>}
              backIcon={false}
              style={{ paddingLeft: 0 }}
              extra={[
                <Button
                  type="primary"
                  onClick={() => uiStore!.openCreateCaseModal()}
                >
                  Create Case
                </Button>
              ]}
            />
            <span
              style={{
                marginBottom: "30px",
                width: "40%",
                display: "inline-block"
              }}
            >
              <FilterInput />
            </span>
            {allCasesStore!.numberOfSelectedCases === 0 ? (
              <span />
            ) : (
              <span style={{ paddingLeft: "18px" }}>
                <ActionsDropdown />
              </span>
            )}
            <CasesTable />
          </div>
        );
      }
    }
  )
);
