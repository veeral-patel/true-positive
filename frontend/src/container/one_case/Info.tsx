import { RouteComponentProps } from "@reach/router";
import { Col, Divider, Layout, Row, Typography } from "antd";
import ActionsDropdown from "container/one_case/ActionsDropdown";
import CreateComment from "container/shared/comments/CreateComment";
import DescriptionForm from "container/shared/description/DescriptionForm";
import { inject, observer } from "mobx-react";
import ListofMergedCasesP from "presentational/one_case/ListofMergedCasesP";
import CommentList from "presentational/shared/comments/CommentListP";
import EditableAssigneeTag from "presentational/shared/tags/EditableAssigneeTag";
import EditablePriorityTag from "presentational/shared/tags/EditablePriorityTag";
import EditableStatusTag from "presentational/shared/tags/EditableStatusTag";
import EditableTagList from "presentational/shared/tags/EditableTagList";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import formatISO8601 from "utils/formatISO8601";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";

const { Content } = Layout;
const { Text } = Typography;

interface InfoProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Info extends React.Component<InfoProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

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
                  <Col span={8}>
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
                    {activeCase.tags.length > 0 ? (
                      <EditableTagList existingTags={activeCase.tags} />
                    ) : (
                      "N/A"
                    )}
                  </Col>
                </Row>
              </section>

              <section>
                <Row>
                  <Col span={24}>
                    <Divider orientation="left">Description</Divider>
                    <DescriptionForm
                      initialDescription={activeCase.description}
                      updateDescription={newDescription =>
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
                    <div style={{ width: "70%" }}>
                      <CreateComment objectId={activeCase.id} type="CASE" />
                    </div>
                  </Col>
                </Row>
              </section>

              {activeCase.mergedCases.length > 0 && (
                <section>
                  <Divider orientation="left">
                    Merged Cases ({activeCase.mergedCases.length})
                  </Divider>
                  <Text>
                    {activeCase.mergedCases.length} case(s) have been merged
                    into this case.
                  </Text>
                  <div style={{ marginTop: "15px" }}>
                    <ListofMergedCasesP mergedCases={activeCase.mergedCases} />
                  </div>
                </section>
              )}
            </Content>
          );
      }
    }
  )
);
