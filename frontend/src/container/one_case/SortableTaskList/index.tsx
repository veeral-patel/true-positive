import { List } from "antd";
import SortableItem from "container/one_case/SortableTaskList/SortableItem";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ITask from "ts/interfaces/ITask";

interface Props {
  activeCaseStore?: ActiveCaseStore;
}

function SortableList({ activeCaseStore }: Props) {
  const activeCase = activeCaseStore!.activeCase;
  if (activeCase)
    return (
      <List<ITask>
        itemLayout="horizontal"
        dataSource={activeCase.tasks}
        bordered
        renderItem={task => (
          <SortableItem
            task={task}
            markTaskAsDone={activeCaseStore!.markTaskAsDone}
          />
        )}
      />
    );
  return null;
}

export default inject("activeCaseStore")(observer(SortableList));
