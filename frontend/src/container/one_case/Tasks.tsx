import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import TasksP from "presentational/one_case/TasksP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface TaskProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Task extends React.Component<TaskProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing
        // our spinner above this, as a HOC
        if (activeCase)
          return (
            <TasksP
              caseId={activeCase.id}
              caseName={activeCase.name}
              tasks={activeCase.tasks}
            />
          );
      }
    }
  )
);
