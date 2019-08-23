import { inject, observer } from "mobx-react";
import TopMenuP from "presentational/shared/top_menu/TopMenuP";
import React from "react";
import CaseStore from "stores/AllCasesStore";

interface ITopMenuProps {
  allCasesStore?: CaseStore;
}

export default inject("allCasesStore")(
  observer(
    class TopMenuProps extends React.Component<IFilterInputProps> {
      componentDidMount() {
        const { allCasesStore } = this.props;
        allCasesStore!.loadCases();
      }

      render() {
        const { allCasesStore } = this.props;
        return <TopMenuP numberOfCases={allCasesStore!.numberOfCases} />;
      }
    }
  )
);
