import { List } from "antd";
import React from "react";
import ICase from "ts/interfaces/ICase";

interface ListofMergedCasesProps {
  mergedCases: ICase[];
}

const ListofMergedCasesP: React.FC<ListofMergedCasesProps> = ({
  mergedCases
}) => (
  <List
    itemLayout="horizontal"
    dataSource={mergedCases}
    renderItem={theCase => (
      <List.Item>
        <List.Item.Meta
          title={theCase.name}
          description={theCase.description}
        />
      </List.Item>
    )}
  />
);

export default ListofMergedCasesP;
