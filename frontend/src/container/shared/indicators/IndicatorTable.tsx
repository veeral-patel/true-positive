import { Layout, Table } from "antd";
import Column from "antd/lib/table/Column";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import UIStore from "stores/UIStore";
import IIndicator from "ts/interfaces/IIndicator";
import ITag from "ts/interfaces/ITag";
const { Content } = Layout;

interface IndicatorTableProps {
  indicators: IIndicator[];
  uiStore?: UIStore;
}

export default inject("uiStore")(
  observer(
    class IndicatorTable extends React.Component<IndicatorTableProps> {
      render() {
        const { indicators, uiStore } = this.props;
        return (
          <Table
            dataSource={indicators}
            rowKey={record => record.id.toString()}
            pagination={{ hideOnSinglePage: true }}
            onRowClick={(indicator, index, event) => {
              uiStore!.openIndicatorDrawer(indicator.task.id, indicator.id);
            }}
          >
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              sorter={(a: IIndicator, b: IIndicator) =>
                a.name.localeCompare(b.name)
              }
            />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={(tags: ITag[]) => (
                <div style={{ lineHeight: 2.0 }}>
                  <ListOfTagsP tags={tags} />
                </div>
              )}
            />
            <Column title="Task" dataIndex="task.name" key="task" />
          </Table>
        );
      }
    }
  )
);
