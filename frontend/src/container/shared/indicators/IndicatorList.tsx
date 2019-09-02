import { inject, observer } from "mobx-react";
import IndicatorListP from "presentational/shared/indicators/IndicatorListP";
import React from "react";
import UIStore from "stores/UIStore";
import IIndicator from "ts/interfaces/IIndicator";
import ITask from "ts/interfaces/ITask";

interface IndicatorListProps {
  indicators: IIndicator[];
  activeTask: ITask;
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class IndicatorList extends React.Component<IndicatorListProps> {
      render() {
        const { indicators } = this.props;
        return (
          <IndicatorListP
            indicators={indicators}
            openIndicatorDrawer={this.openIndicatorDrawer.bind(this)}
          />
        );
      }

      openIndicatorDrawer(indicatorId: number) {
        const { uiStore, activeTask } = this.props;
        uiStore!.openIndicatorDrawer(activeTask.id, indicatorId);
      }
    }
  )
);
