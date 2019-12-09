import { CopyOutlined, MessageOutlined } from "@ant-design/icons";
import { navigate } from "@reach/router";
import { Button, List, message, Tooltip, Typography } from "antd";
import copy from "copy-to-clipboard";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";
import { getPathToAnIndicator } from "utils/pathHelpers";
import truncateString from "utils/truncateString";

const { Text } = Typography;

interface Props {
  indicators: IIndicator[];
}

class IndicatorList extends React.Component<Props> {
  render() {
    const { indicators } = this.props;
    return (
      <List
        bordered
        dataSource={indicators}
        renderItem={indicator => (
          <List.Item
            style={{ cursor: "pointer" }}
            className="hoverable_item"
            onClick={() =>
              navigate(getPathToAnIndicator(indicator.case.id, indicator.id))
            }
          >
            <List.Item.Meta
              title={
                <div>
                  <Text>{truncateString(indicator.name, 50)}</Text>
                  <Button
                    icon={<CopyOutlined />}
                    type="link"
                    size="small"
                    onClick={event => {
                      event.stopPropagation();
                      copy(indicator.name);
                      message.success("Copied name");
                    }}
                  />
                </div>
              }
              description={
                <div>
                  {indicator.tags.length === 0 ? (
                    "No tags"
                  ) : (
                    <div style={{ marginTop: "0.75em" }}>
                      <ListOfTagsP tags={indicator.tags} limit={5} />
                    </div>
                  )}
                </div>
              }
            />
            <div>
              <Text style={{ marginRight: "0.75em" }} type="secondary">
                {indicator.type}
              </Text>
              <Tooltip title={`${indicator.comments.length} comment(s)`}>
                <MessageOutlined />
                {indicator.comments.length}
              </Tooltip>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default IndicatorList;
