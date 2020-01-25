import { Empty, List, Typography } from "antd";
import SortableItem from "container/one_case/SortableTTList/SortableItem";
import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";
import ITaskGroup from "ts/interfaces/ITaskGroup";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

const { Paragraph, Text } = Typography;

interface Props {
  taskGroup: ITaskGroup;
  caseTemplate: ICaseTemplate;
  orderedTTs: ITaskTemplate[];
  handleTTClicked: (id: number) => void;
  removeTaskTemplate: (taskTemplateId: number) => void;
}

const SortableList = SortableContainer(
  ({
    orderedTTs,
    handleTTClicked,
    taskGroup,
    caseTemplate,
    removeTaskTemplate
  }: Props) => {
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
            taskGroup={taskGroup}
            caseTemplate={caseTemplate}
            handleTTClicked={handleTTClicked}
            removeTaskTemplate={removeTaskTemplate}
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
