import { navigate } from "@reach/router";
import { Icon, Avatar, Comment, Divider, Input, Layout, PageHeader } from "antd";
import AddCommentFormP from "presentational/one_case/InfoP/AddCommentFormP";
import DetailsP from "presentational/one_task/DetailsSectionP";
import CommentListP from "presentational/shared/comments/CommentListP";
import DescriptionP from "presentational/shared/description/DescriptionP";
import IndicatorListP from "presentational/shared/indicators/IndicatorListP";
import React from "react";
import ICase from "ts/interfaces/ICase";
import ITask from "ts/interfaces/ITask";
import { getPathToCaseTasks } from "utils/pathHelpers";
import sortCommentsByCreatedAt from "utils/sortCommentsByCreatedAt";

const { Content } = Layout;

interface OneTaskProps {
  activeCase: ICase;
  activeTask: ITask;
}

const OneTaskP: React.FC<OneTaskProps> = ({ activeCase, activeTask }) => (
  <Content
    style={{
      backgroundColor: "#fff",
      padding: 24,
      height: "100%"
    }}
  >
    <PageHeader
      onBack={() => navigate(getPathToCaseTasks(activeCase.id))}
      title={activeTask.name}
    />

    <DetailsP activeTask={activeTask} />

    <section>
      <Divider orientation="left">Description</Divider>
      <DescriptionP description={activeTask.description} />
    </section>

    <section>
      <Divider orientation="left">
        Comments ({activeTask.comments.length})
      </Divider>
      {activeTask.comments.length > 0 && (
        <CommentListP comments={sortCommentsByCreatedAt(activeTask.comments)} />
      )}
      <div style={{ width: "70%" }}>
        <Comment
          content={<AddCommentFormP />}
          avatar={<Avatar icon="user" />}
        />
      </div>
    </section>

    <section>
      <Divider orientation="left">
        Indicators ({activeTask.indicators.length})
      </Divider>
      <div style={{ width: "70%" }}>
        <div style={{ marginBottom: "25px" }}>
          <Input placeholder="Enter an IP, file hash, domain, or URL to add" prefix={<Icon type="plus" />} suffix={<Icon type="arrow-right" />} />
        </div>
        <div>
          <IndicatorListP indicators={activeTask.indicators} />
        </div>
      </div>
    </section>
  </Content>
);

export default OneTaskP;
