import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { navigate, RouteComponentProps } from "@reach/router";
import {
  Col,
  Divider,
  Layout,
  message,
  notification,
  PageHeader,
  Row,
  Typography
} from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { UploadFile } from "antd/lib/upload/interface";
import { ApolloError } from "apollo-boost";
import ActionsDropdown from "container/one_task/ActionsDropdown";
import CreateComment from "container/shared/comments/CreateComment";
import DescriptionEditor from "container/shared/markdown/DescriptionEditor";
import { inject, observer } from "mobx-react";
import DELETE_ATTACHMENT from "mutations/deleteAttachment";
import UPDATE_TASK from "mutations/updateTask";
import CommentListP from "presentational/shared/comments/CommentListP";
import Error from "presentational/shared/errors/Error";
import EditableAssigneeTag from "presentational/shared/tags/EditableAssigneeTag";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";
import formatISO8601 from "utils/formatISO8601";
import { getPathToCaseTasks } from "utils/pathHelpers";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";

const { Content } = Layout;
const { Text, Paragraph } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  taskId?: number;
  uiStore?: UIStore;
}

export default inject(
  "activeCaseStore",
  "uiStore"
)(
  observer(function OneTask({ activeCaseStore, uiStore, taskId }: Props) {
    const activeCase = activeCaseStore!.activeCase;

    const [updateTask] = useMutation(UPDATE_TASK, {
      onCompleted: function() {
        message.success("Updated the task");
        activeCaseStore!.loadActiveCase();
      },
      onError: function(error: ApolloError) {
        notification.error({
          message: "Could not update the task",
          description: error.message
        });
      }
    });

    const [deleteAttachment] = useMutation(DELETE_ATTACHMENT, {
      onCompleted: function() {
        message.success("Deleted the attachment");
        activeCaseStore!.loadActiveCase();
      },
      onError: function(error) {
        notification.error({
          message: "Could not delete the attachment",
          description: error.message
        });
      }
    });

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
    if (activeCase) {
      var defaultFileList: UploadFile[] = [];
      activeTask.attachments.forEach(attachment => {
        defaultFileList.push({
          uid: attachment.id.toString(),
          name: `${attachment.name} [${attachment.friendlySize}]`,
          url: attachment.url,
          status: "done",
          size: attachment.size,
          type: "application/octet-stream"
        });
      });

      return (
        <Content
          style={{
            backgroundColor: uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
            padding: 24,
            height: "100%"
          }}
        >
          <PageHeader
            onBack={() => navigate(getPathToCaseTasks(activeCase.id))}
            backIcon={<ArrowLeftOutlined style={{ fontSize: 14 }} />}
            title={
              <Text
                style={{ fontSize: 16 }}
                editable={{
                  onChange: (newName: string) =>
                    updateTask({
                      variables: {
                        input: {
                          taskId: activeTask.id,
                          name: newName
                        }
                      }
                    })
                }}
              >
                {activeTask.name}
              </Text>
            }
            extra={
              <ActionsDropdown taskId={activeTask.id} caseId={activeCase.id} />
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
                    updateTask({
                      variables: {
                        input: {
                          taskId: activeTask.id,
                          assignedTo: username
                        }
                      }
                    })
                  }
                />
              </Col>
            </Row>
          </section>

          <section style={{ marginTop: "3em" }}>
            <Divider orientation="left">Description</Divider>
            <DescriptionEditor
              initialValue={activeTask.description}
              updateValue={newDescription =>
                updateTask({
                  variables: {
                    input: {
                      taskId: activeTask.id,
                      description: newDescription
                    }
                  }
                })
              }
            />
          </section>

          <section style={{ marginTop: "3em" }}>
            <Divider orientation="left">
              Attachments ({activeCase.attachmentCount})
            </Divider>
            <Dragger
              multiple
              defaultFileList={defaultFileList}
              onRemove={file => {
                deleteAttachment({
                  variables: {
                    input: {
                      id: file.uid
                    }
                  }
                });
                return false;
              }}
              style={{ maxWidth: "750px" }}
            >
              <UploadOutlined style={{ fontSize: 36 }} />
              <div style={{ marginTop: "1em" }}>
                <Paragraph>
                  Click or drag file(s) to this area to upload
                </Paragraph>
              </div>
            </Dragger>
          </section>

          <section style={{ marginTop: "3em" }}>
            <Divider orientation="left">
              Comments ({activeTask.comments.length})
            </Divider>
            {activeTask.comments.length > 0 && (
              <CommentListP
                comments={sortCommentsByCreatedAt(activeTask.comments)}
              />
            )}
            <CreateComment objectId={activeTask.id} type="TASK" />
          </section>
        </Content>
      );
    }
    return null;
  })
);
