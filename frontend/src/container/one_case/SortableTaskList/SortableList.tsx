import { List } from "antd";
import SortableItem from "container/one_case/SortableTaskList/SortableItem";
import { inject, observer } from "mobx-react";
import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITask from "ts/interfaces/ITask";

interface Props {
  activeCaseStore?: ActiveCaseStore;
  orderedTasks: ITask[];
}

const SortableList = SortableContainer(
  ({ activeCaseStore, orderedTasks }: Props) => {
    return (
      <List<ITask>
        itemLayout="horizontal"
        dataSource={orderedTasks}
        bordered
        renderItem={(task, index) => (
          <SortableItem
            key={task.id}
            index={index} // this needs to be index, not task.id
            task={task}
            markTaskAsDone={activeCaseStore!.markTaskAsDone}
          />
        )}
      />
    );
  }
);

export default inject("activeCaseStore")(observer(SortableList));
