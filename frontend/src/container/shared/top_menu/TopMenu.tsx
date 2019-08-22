import { inject, observer } from "mobx-react";
import TopMenuP from "presentational/shared/top_menu/TopMenuP";
import React from "react";
import CaseStore from "stores/CaseStore";

interface IFilterInputProps {
  caseStore?: CaseStore;
}

export default inject("caseStore")(
  observer(
    class FilterInput extends React.Component<IFilterInputProps> {
      componentDidMount() {
        const { caseStore } = this.props;
        caseStore!.loadCases();
      }

      render() {
        const { caseStore } = this.props;
        return <TopMenuP numberOfCases={caseStore!.numberOfCases} />;
      }
    }
  )
);
