import { RouteComponentProps } from "@reach/router";
import { Divider, Empty, Icon, Input, Radio, Typography } from "antd";
import AllTasksTable from "container/all_tasks/AllTasksTable";
import { inject, observer } from "mobx-react";
import React from "react";
import AllTasksStore from "stores/AllTasksStore";
import UIStore from "stores/UIStore";

const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  uiStore?: UIStore;
  allTasksStore?: AllTasksStore;
}

export default inject("allTasksStore", "uiStore")(
  observer(
    class AllTasksPage extends React.Component<Props> {
      componentDidMount() {
        const { allTasksStore } = this.props;
        allTasksStore!.loadTasks();
      }

      render() {
        const { allTasksStore, uiStore } = this.props;
        return (
          <div>
            <section>
              <h2>Tasks</h2>
            </section>
            {allTasksStore!.tasks.length > 0 ? (
              <div>
                <section>
                  <Paragraph>
                    These are all the tasks from the cases that you're a member
                    of.
                  </Paragraph>
                </section>
                <section>
                  <span
                    style={{
                      marginBottom: "30px",
                      width: "40%",
                      display: "inline-block"
                    }}
                  >
                    <Input
                      placeholder="Filter tasks"
                      prefix={<Icon type="search" />}
                    />
                  </span>
                  <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                    <Divider type="vertical" />
                  </span>
                  <span>
                    <Radio.Group defaultValue="assigned">
                      <Radio.Button value="assigned">Assigned</Radio.Button>
                      <Radio.Button value="all">All</Radio.Button>
                    </Radio.Group>
                  </span>
                </section>
                <section>
                  <AllTasksTable />
                </section>
              </div>
            ) : (
              <Empty
                description={
                  <div style={{ marginTop: "1em" }}>
                    <h2 style={{ fontWeight: "normal" }}>No tasks</h2>
                    <Paragraph style={{ fontSize: 16 }}>
                      A task is a piece of work to be completed in a case.
                    </Paragraph>
                    <Paragraph style={{ fontSize: 16 }}>
                      Before creating a task, you must first{" "}
                      <a onClick={() => uiStore!.openCreateCaseModal()}>
                        create a case
                      </a>
                      .
                    </Paragraph>
                  </div>
                }
              />
            )}
          </div>
        );
      }
    }
  )
);
