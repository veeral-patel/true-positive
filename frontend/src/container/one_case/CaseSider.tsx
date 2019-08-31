import { CollapseType } from "antd/lib/layout/Sider";
import { inject, observer } from "mobx-react";
import CaseSiderP from "presentational/one_case/CaseSiderP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";

interface ICaseSiderProps {
  uiStore?: UIStore;
  activeCaseStore?: ActiveCaseStore;
}

export default inject("uiStore", "activeCaseStore")(
  observer(
    class CaseSider extends React.Component<ICaseSiderProps> {
      render() {
        const { uiStore, activeCaseStore } = this.props;

        const isLoading = activeCaseStore!.activeCaseIsLoading;
        const activeCase = activeCaseStore!.activeCase;

        let caseName: string;
        let numberOfMembers: number | null;
        let numberOfTasks: number | null;

        if (isLoading) {
          caseName = "Loading";
          numberOfMembers = null;
          numberOfTasks = null;
        } else {
          if (activeCase) {
            caseName = activeCase.name;
            numberOfMembers = activeCase.caseMembers.length;
            numberOfTasks = activeCase.tasks.length;
          } else {
            caseName = "Error";
            numberOfMembers = null;
            numberOfTasks = null;
          }
        }
        return (
          <CaseSiderP
            caseName={caseName}
            numberOfMembers={numberOfMembers}
            numberOfTasks={numberOfTasks}
            collapsed={uiStore!.caseSiderStatus === "COLLAPSED"}
            handleCollapse={(collapsed: boolean, type: CollapseType) =>
              uiStore!.toggleCaseSider()
            }
          />
        );
      }
    }
  )
);
