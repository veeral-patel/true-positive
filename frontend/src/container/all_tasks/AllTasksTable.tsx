import { navigate } from "@reach/router";
import { Table } from "antd";
import TasksTable from "container/all_tasks/TasksTable";
import { inject, observer } from "mobx-react";
import React from "react";
import AllTasksStore from "stores/AllTasksStore";
import { getPathToATask } from "utils/pathHelpers";

interface Props {
  allTasksStore?: AllTasksStore;
}

export default inject("allTasksStore")(
  observer(
    class AllTasksTable extends React.Component<Props> {
      componentDidMount() {
        const { allTasksStore } = this.props;
        allTasksStore!.loadTasks();
      }

      render() {
        const { allTasksStore } = this.props;
        if (allTasksStore!.tasksAreLoading) {
          return <Table loading />;
        }
        return (
          <TasksTable
            tasks={allTasksStore!.filteredTasks}
            includeExtraColumns={true}
            handleRowClick={(clickedTask, index, event) =>
              navigate(getPathToATask(clickedTask.case.id, clickedTask.id))
            }
          />
        );
      }
    }
  )
);
