import { Empty, List, Typography } from "antd";
import SortableItem from "container/one_case/SortableTaskList/SortableItem";
import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import ITask from "ts/interfaces/ITask";

const { Paragraph, Text } = Typography;

interface Props {
  markTaskAsDone: (taskId: number, done: boolean) => void;
  orderedTasks: ITask[];
}

const SortableList = SortableContainer(
  ({ markTaskAsDone, orderedTasks }: Props) => {
    return (
      <List<ITask>
        itemLayout="horizontal"
        dataSource={orderedTasks}
        bordered
        renderItem={(task, index) => (
          <SortableItem
            key={task.id}
            index={index}
            task={task}
            markTaskAsDone={markTaskAsDone}
          />
        )}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Paragraph>No tasks</Paragraph>
                  <Text type="secondary">Add a task to this group above</Text>
                </div>
              }
            />
          )
        }}
      />
    );
  }
);

export default SortableList;
