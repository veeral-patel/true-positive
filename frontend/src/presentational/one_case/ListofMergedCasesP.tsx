import { List } from "antd";
import React from "react";
import ICase from "ts/interfaces/ICase";
import { getPathToACase } from "utils/pathHelpers";

interface ListofMergedCasesProps {
  mergedCases: ICase[];
}

const ListofMergedCasesP: React.FC<ListofMergedCasesProps> = ({
  mergedCases
}) => (
  <List
    itemLayout="horizontal"
    dataSource={mergedCases}
    renderItem={childCase => (
      <List.Item>
        <List.Item.Meta
          title={<a href={getPathToACase(childCase.id)}>{childCase.name}</a>}
          description={
            childCase.reasonForMerging == null
              ? "No reason for merging was given"
              : childCase.reasonForMerging
          }
        />
      </List.Item>
    )}
  />
);

export default ListofMergedCasesP;
