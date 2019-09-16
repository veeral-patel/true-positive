import { navigate, RouteComponentProps } from "@reach/router";
import {
  Avatar,
  Comment,
  Divider,
  Layout,
  notification,
  PageHeader,
  Typography
} from "antd";
import ActionsDropdown from "container/one_task/ActionsDropdown";
import { inject, observer } from "mobx-react";
import AddCommentFormP from "presentational/one_case/InfoP/AddCommentFormP";
import DetailsP from "presentational/one_task/DetailsSectionP";
import CommentListP from "presentational/shared/comments/CommentListP";
import DescriptionP from "presentational/shared/description/DescriptionP";
import ErrorP from "presentational/shared/errors/ErrorP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
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
          notification.error({
            message: "Could not extract this task's ID from the URL",
            description: "Ensure you're at a valid URL"
          });
          return (
            <ErrorP
              title="Could not extract this task's ID from the URL"
              subtitle="Ensure you're at a valid URL"
            />
          );
        }

        const activeTask = activeCaseStore!.getTask(taskId);

        if (!activeTask) {
          notification.error({
            message: "Could not load task",
            description: "Ensure that a task with this ID exists"
          });
          return (
            <ErrorP
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
                title={
                  <Text
                    style={{ fontSize: 18, paddingTop: "5px" }}
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

              <DetailsP
                activeTask={activeTask}
                changeTaskStatus={activeCaseStore!.changeTaskStatus}
                changeTaskPriority={activeCaseStore!.changeTaskPriority}
              />

              <section>
                <Divider orientation="left">Description</Divider>
                <DescriptionP description={activeTask.description} />
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
                  <Comment
                    content={<AddCommentFormP />}
                    avatar={<Avatar icon="user" />}
                  />
                </div>
              </section>
            </Content>
          );
      }
    }
  )
);
