import { Table } from "antd";
import TasksTable from "container/one_case/TasksTable";
import { inject, observer } from "mobx-react";
import React from "react";
import AllTasksStore from "stores/AllTasksStore";

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
            tasks={allTasksStore!.tasks}
            handleRowClick={() => void 0}
          />
        );
      }
    }
  )
);
