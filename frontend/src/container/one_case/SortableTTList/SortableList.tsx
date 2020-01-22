import { Empty, List, Typography } from "antd";
import SortableItem from "container/one_case/SortableTTList/SortableItem";
import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

const { Paragraph, Text } = Typography;

interface Props {
  orderedTTs: ITaskTemplate[];
  handleTTClicked: (id: number) => void;
}

const SortableList = SortableContainer(
  ({ orderedTTs, handleTTClicked }: Props) => {
    return (
      <List<ITaskTemplate>
        itemLayout="horizontal"
        dataSource={orderedTTs}
        bordered
        renderItem={(taskTemplate, index) => (
          <SortableItem
            key={taskTemplate.id}
            index={index}
            taskTemplate={taskTemplate}
            handleTTClicked={handleTTClicked}
          />
        )}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Paragraph>No task templates</Paragraph>
                  <Text type="secondary">
                    Add a task template to this group above
                  </Text>
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
