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

        if (isLoading) {
          return (
            <CaseSiderP
              caseName="Loading"
              numberOfMembers={null}
              numberOfTasks={null}
              collapsed={uiStore!.caseSiderStatus === "COLLAPSED"}
              handleCollapse={(collapsed: boolean, type: CollapseType) =>
                uiStore!.toggleCaseSider()
              }
            />
          );
        } else {
          if (activeCase) {
            return (
              <CaseSiderP
                caseName={activeCase.name}
                numberOfMembers={activeCase.caseMembers.length}
                numberOfTasks={activeCase.tasks.length}
                collapsed={uiStore!.caseSiderStatus === "COLLAPSED"}
                handleCollapse={(collapsed: boolean, type: CollapseType) =>
                  uiStore!.toggleCaseSider()
                }
              />
            );
          } else {
            return (
              <CaseSiderP
                caseName="Error"
                numberOfMembers={null}
                numberOfTasks={null}
                collapsed={uiStore!.caseSiderStatus === "COLLAPSED"}
                handleCollapse={(collapsed: boolean, type: CollapseType) =>
                  uiStore!.toggleCaseSider()
                }
              />
            );
          }
        }
      }
    }
  )
);
