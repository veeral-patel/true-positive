import { RouteComponentProps } from "@reach/router";
import { Divider, Empty, Radio, Typography } from "antd";
import AllTasksTable from "container/all_tasks/AllTasksTable";
import FilterInput from "container/all_tasks/FilterInput";
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
              {allTasksStore!.tasksAreLoading ? (
                <h3>Tasks</h3>
              ) : (
                <h3>Tasks ({allTasksStore!.filteredTasks.length})</h3>
              )}
            </section>
            {allTasksStore!.tasks.length > 0 && (
              <div>
                <section>
                  <Paragraph type="secondary">
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
                    <FilterInput />
                  </span>
                  <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                    <Divider type="vertical" />
                  </span>
                  <span style={{ marginRight: "16px" }}>
                    <Radio.Group
                      value={allTasksStore!.assignedOrAll}
                      onChange={event => {
                        const newFilter = event.target.value;
                        allTasksStore!.setAssignedFilter(newFilter);
                      }}
                    >
                      <Radio.Button value="ASSIGNED">Assigned</Radio.Button>
                      <Radio.Button value="ALL">All</Radio.Button>
                    </Radio.Group>
                  </span>
                  <span>
                    <Radio.Group
                      value={allTasksStore!.doneFilter}
                      onChange={event => {
                        const newFilter = event.target.value;
                        allTasksStore!.setDoneFilter(newFilter);
                      }}
                    >
                      <Radio.Button value="NOT_DONE">Not Done</Radio.Button>
                      <Radio.Button value="DONE">Done</Radio.Button>
                      <Radio.Button value="ALL">All</Radio.Button>
                    </Radio.Group>
                  </span>
                </section>
                <section>
                  {allTasksStore!.filteredTasks.length === 0 ? (
                    <Empty
                      description={
                        <div style={{ marginTop: "1em" }}>
                          <h3>No tasks</h3>
                          <Paragraph>
                            No tasks match your filters above
                          </Paragraph>
                        </div>
                      }
                    />
                  ) : (
                    <AllTasksTable />
                  )}
                </section>
              </div>
            )}
            {allTasksStore!.tasks.length === 0 &&
              !allTasksStore!.tasksAreLoading && (
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
