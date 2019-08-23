import { CollapseType } from "antd/lib/layout/Sider";
import { inject, observer } from "mobx-react";
import CaseSiderP from "presentational/cases/CaseSiderP";
import React from "react";
import UIStore from "stores/UIStore";

interface ICaseSiderProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class CaseSider extends React.Component<ICaseSiderProps> {
      render() {
        const { uiStore } = this.props;
        return (
          <CaseSiderP
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
