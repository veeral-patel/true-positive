import { useMutation } from "@apollo/react-hooks";
import { RouteComponentProps } from "@reach/router";
import {
  Button,
  Col,
  Divider,
  Layout,
  List,
  message,
  notification,
  Popconfirm,
  Row,
  Tooltip
} from "antd";
import { ApolloError } from "apollo-boost";
import ActionsDropdown from "container/one_case/ActionsDropdown";
import CreateComment from "container/shared/comments/CreateComment";
import MarkdownEditor from "container/shared/markdown/DescriptionEditor";
import { inject, observer } from "mobx-react";
import MERGE_A_CASE from "mutations/mergeCase";
import CommentList from "presentational/shared/comments/CommentListP";
import EditableAssigneeTag from "presentational/shared/tags/EditableAssigneeTag";
import EditablePriorityTag from "presentational/shared/tags/EditablePriorityTag";
import EditableStatusTag from "presentational/shared/tags/EditableStatusTag";
import EditableTagList from "presentational/shared/tags/EditableTagList";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import formatISO8601 from "utils/formatISO8601";
import { getPathToACase } from "utils/pathHelpers";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";

const { Content } = Layout;

interface InfoProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(function Info(props: InfoProps) {
    const { activeCaseStore } = props;
    const activeCase = activeCaseStore!.activeCase;

    const [unmergeCase] = useMutation(MERGE_A_CASE, {
      onCompleted: function() {
        message.success("Un-merged the case");
        activeCaseStore!.loadActiveCase();
      },
      onError: function(error: ApolloError) {
        notification.error({
          message: "Could not un-merge this case",
          description: error.message
        });
      }
    });

    // should always render, since we're catching errors and showing
    // our spinner above this, as a HOC
    if (activeCase)
      return (
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <section>
            <div style={{ display: "inline-block" }}>
              <h3>Info</h3>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <ActionsDropdown caseId={activeCase.id} />
            </div>
          </section>

          {/* Details section */}
          <section style={{ lineHeight: 3 }}>
            <Row>
              <Col span={24}>
                <Divider orientation="left">Details</Divider>
              </Col>
            </Row>
            <Row>
              <Col span={4}>Status:</Col>
              <Col span={8}>
                <EditableStatusTag
                  statusName={activeCase.status.name}
                  handleSelect={statusName =>
                    activeCaseStore!.changeCaseStatus(statusName)
                  }
                />
              </Col>
              <Col span={4}>Created:</Col>
              <Col span={8} style={{ lineHeight: 2 }}>
                {`${formatISO8601(activeCase.createdAt)} UTC by ${
                  activeCase.createdBy.username
                }`}
              </Col>
            </Row>
            <Row>
              <Col span={4}>Priority:</Col>
              <Col span={8}>
                <EditablePriorityTag
                  priorityName={activeCase.priority.name}
                  handleSelect={priorityName =>
                    activeCaseStore!.changeCasePriority(priorityName)
                  }
                />
              </Col>
              <Col span={4}>Assigned To:</Col>
              <Col span={8}>
                <EditableAssigneeTag
                  user={activeCase.assignedTo}
                  handleSelect={username =>
                    activeCaseStore!.changeCaseAssignee(username)
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={4}>Tags:</Col>
              <Col span={20}>
                <EditableTagList
                  existingTags={activeCase.tags}
                  type="CASE"
                  objectId={activeCaseStore!.activeCaseId}
                />
              </Col>
            </Row>
          </section>

          <section>
            <Row>
              <Col span={24}>
                <Divider orientation="left">Description</Divider>
                <MarkdownEditor
                  initialValue={activeCase.description}
                  updateValue={newDescription =>
                    activeCaseStore!.changeDescription(
                      activeCase.id,
                      newDescription,
                      "CASE"
                    )
                  }
                />
              </Col>
            </Row>
          </section>

          <section>
            <Row>
              <Col span={24}>
                <Divider orientation="left">
                  Comments ({activeCase.comments.length})
                </Divider>
                {activeCase.comments.length > 0 && (
                  <CommentList
                    comments={sortCommentsByCreatedAt(activeCase.comments)}
                  />
                )}
                <CreateComment objectId={activeCase.id} type="CASE" />
              </Col>
            </Row>
          </section>

          {activeCase.mergedCases.length > 0 && (
            <section>
              <Divider orientation="left">
                Merged Cases ({activeCase.mergedCases.length})
              </Divider>
              <List
                itemLayout="horizontal"
                dataSource={activeCase.mergedCases}
                renderItem={childCase => (
                  <List.Item
                    actions={[
                      // <Tooltip title="Edit merge reason">
                      //   <Button icon="edit" type="link" />,
                      // </Tooltip>,
                      <Popconfirm
                        title="Un-merge this case?"
                        onConfirm={() =>
                          unmergeCase({
                            variables: {
                              input: {
                                childCaseId: childCase.id,
                                parentCaseId: null
                              }
                            }
                          })
                        }
                      >
                        <Tooltip title="Un-merge case" placement="right">
                          <Button icon="cross" type="link" />
                        </Tooltip>
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <a href={getPathToACase(childCase.id)}>
                          {childCase.name}
                        </a>
                      }
                      description={
                        childCase.reasonForMerging == null
                          ? "No merge reason was given"
                          : childCase.reasonForMerging
                      }
                    />
                  </List.Item>
                )}
              />
            </section>
          )}
        </Content>
      );
    return null;
  })
);
