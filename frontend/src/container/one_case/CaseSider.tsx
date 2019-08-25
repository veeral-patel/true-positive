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
        let caseName: string;

        if (activeCaseStore!.activeCaseIsLoading) caseName = "Loading...";
        else if (activeCaseStore!.activeCase === null) caseName = "Error";
        else caseName = activeCaseStore!.activeCase.name;
        return (
          <CaseSiderP
            caseName={caseName}
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
