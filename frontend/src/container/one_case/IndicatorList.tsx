import { navigate } from "@reach/router";
import { Button, Icon, List, message, Tooltip, Typography } from "antd";
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
                    icon="copy"
                    type="link"
                    size="small"
                    onClick={event => {
                      event.stopPropagation();
                      copy(indicator.name);
                      message.success("Copied indicator");
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
            <Tooltip title={`${indicator.comments.length} comment(s)`}>
              <Icon type="message" /> {indicator.comments.length}
            </Tooltip>
          </List.Item>
        )}
      />
    );
  }
}

export default IndicatorList;
