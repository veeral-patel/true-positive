import { Col, Divider, Row } from "antd";
import { inject, observer } from "mobx-react";
import EditableAssigneeTag from "presentational/shared/tags/EditableAssigneeTag";
import EditablePriorityTag from "presentational/shared/tags/EditablePriorityTag";
import EditableStatusTag from "presentational/shared/tags/EditableStatusTag";
import EditableTagList from "presentational/shared/tags/EditableTagList";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import ICase from "ts/interfaces/ICase";

interface DetailsSectionProps {
  activeCase: ICase;
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class DetailsSection extends React.Component<DetailsSectionProps> {
      render() {
        const { activeCaseStore, activeCase } = this.props;

        return (
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
                  handleSelect={statusId =>
                    activeCaseStore!.changeCaseStatus(statusId)
                  }
                />
              </Col>
              <Col span={4}>Created:</Col>
              <Col span={8}>
                {`${activeCase.formattedCreatedAt} UTC by ${activeCase.createdBy.username}`}
              </Col>
            </Row>
            <Row>
              <Col span={4}>Priority:</Col>
              <Col span={8}>
                <EditablePriorityTag
                  priorityName={activeCase.priority.name}
                  handleSelect={priorityId =>
                    activeCaseStore!.changeCasePriority(priorityId)
                  }
                />
              </Col>
              <Col span={4}>Assigned To:</Col>
              <Col span={8}>
                <EditableAssigneeTag
                  user={activeCase.assignedTo}
                  handleSelect={userId => console.log(userId)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={4}>Tags:</Col>
              <Col span={8}>
                {<EditableTagList existingTags={activeCase.tags} />}
              </Col>
            </Row>
          </section>
        );
      }
    }
  )
);
