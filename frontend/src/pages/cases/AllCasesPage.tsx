import { RouteComponentProps } from "@reach/router";
import { Button, PageHeader } from "antd";
import ActionsDropdown from "container/cases/ActionsDropdown";
import CasesTable from "container/cases/CasesTable";
import FilterInput from "container/cases/FilterInput";
import { inject, observer } from "mobx-react";
import React from "react";
import CaseStore from "stores/CaseStore";

interface IAllCasesPageProps extends RouteComponentProps {
  caseStore?: CaseStore;
}

export default inject("caseStore")(
  observer(
    class AllCasesPage extends React.Component<IAllCasesPageProps> {
      render() {
        const { caseStore } = this.props;
        return (
          <div>
            <PageHeader
              title={<h2>Cases</h2>}
              backIcon={false}
              style={{ paddingLeft: 0 }}
              extra={[<Button type="primary">Create Case</Button>]}
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
            {caseStore!.numberOfSelectedCases === 0 ? (
              <span />
            ) : (
              <span style={{ float: "right", paddingRight: "24px" }}>
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
