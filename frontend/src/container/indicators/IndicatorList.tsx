import { inject, observer } from "mobx-react";
import IndicatorListP from "presentational/shared/indicators/IndicatorListP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

interface IndicatorListProps {
  indicators: IIndicator[];
}

export default inject("uiStore")(
  observer(
    class IndicatorList extends React.Component<IndicatorListProps> {
      render() {
        const { indicators } = this.props;
        return <IndicatorListP indicators={indicators} />;
      }
    }
  )
);
