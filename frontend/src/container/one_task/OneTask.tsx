import { navigate, RouteComponentProps } from "@reach/router";
import { Col, Divider, Icon, Layout, PageHeader, Row, Typography } from "antd";
import ActionsDropdown from "container/one_task/ActionsDropdown";
import CreateComment from "container/shared/comments/CreateComment";
import DescriptionEditor from "container/shared/markdown/DescriptionEditor";
import { inject, observer } from "mobx-react";
import CommentListP from "presentational/shared/comments/CommentListP";
import Error from "presentational/shared/errors/Error";
import EditableAssigneeTag from "presentational/shared/tags/EditableAssigneeTag";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import formatISO8601 from "utils/formatISO8601";
import { getPathToCaseTasks } from "utils/pathHelpers";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";

const { Content } = Layout;
const { Text } = Typography;

interface OneTaskProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  taskId?: number;
}

export default inject("activeCaseStore")(
  observer(
    class OneTask extends React.Component<OneTaskProps> {
      render() {
        const { activeCaseStore, taskId } = this.props;

        const activeCase = activeCaseStore!.activeCase;

        if (!taskId) {
          return (
            <Error
              title="Could not extract this task's ID from the URL"
              subtitle="Ensure you're at a valid URL"
            />
          );
        }

        const activeTask = activeCaseStore!.getTask(taskId);

        if (!activeTask) {
          return (
            <Error
              title="Could not load task"
              subtitle="Ensure that a task with this ID exists"
            />
          );
        }

        // should always render, because we handle error/loading state
        // above, in a HOC
        if (activeCase)
          return (
            <Content
              style={{
                backgroundColor: "#fff",
                padding: 24,
                height: "100%"
              }}
            >
              <PageHeader
                onBack={() => navigate(getPathToCaseTasks(activeCase.id))}
                backIcon={<Icon type="arrow-left" style={{ fontSize: 14 }} />}
                title={
                  <Text
                    style={{ fontSize: 16 }}
                    editable={{
                      onChange: (newText: string) =>
                        activeCaseStore!.renameTask(activeTask.id, newText)
                    }}
                  >
                    {activeTask.name}
                  </Text>
                }
                extra={
                  <ActionsDropdown
                    taskId={activeTask.id}
                    caseId={activeCase.id}
                  />
                }
              />

              <section style={{ lineHeight: 3 }}>
                <Row>
                  <Col span={24}>
                    <Divider orientation="left">Details</Divider>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>Created:</Col>
                  <Col span={20}>
                    {`${formatISO8601(activeTask.createdAt)} UTC by ${
                      activeTask.createdBy.username
                    }`}
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>Assigned To:</Col>
                  <Col span={20}>
                    <EditableAssigneeTag
                      user={activeTask.assignedTo}
                      handleSelect={username =>
                        activeCaseStore!.changeTaskAssignee(
                          activeTask.id,
                          username
                        )
                      }
                    />
                  </Col>
                </Row>
              </section>

              <section>
                <Divider orientation="left">Description</Divider>
                <DescriptionEditor
                  initialValue={activeTask.description}
                  updateValue={newDescription =>
                    activeCaseStore!.changeDescription(
                      activeTask.id,
                      newDescription,
                      "TASK"
                    )
                  }
                />
              </section>

              <section>
                <Divider orientation="left">
                  Comments ({activeTask.comments.length})
                </Divider>
                {activeTask.comments.length > 0 && (
                  <CommentListP
                    comments={sortCommentsByCreatedAt(activeTask.comments)}
                  />
                )}
                <div style={{ width: "70%" }}>
                  <CreateComment objectId={activeTask.id} type="TASK" />
                </div>
              </section>
            </Content>
          );
      }
    }
  )
);
