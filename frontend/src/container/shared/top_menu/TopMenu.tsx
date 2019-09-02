import { inject, observer } from "mobx-react";
import TopMenuP from "presentational/shared/top_menu/TopMenuP";
import React from "react";
import UIStore from "stores/UIStore";

interface TopMenuProps {
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class TopMenu extends React.Component<TopMenuProps> {
      render() {
        const { uiStore } = this.props;
        return <TopMenuP openCreateCaseModal={uiStore!.openCreateCaseModal} />;
      }
    }
  )
);
