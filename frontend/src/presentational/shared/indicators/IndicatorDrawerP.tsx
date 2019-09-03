import { Avatar, Comment, Divider, Drawer, Typography } from "antd";
import AddCommentFormP from "presentational/one_case/InfoP/AddCommentFormP";
import CommentListP from "presentational/shared/comments/CommentListP";
import DescriptionP from "presentational/shared/description/DescriptionP";
import DetailsSectionP from "presentational/shared/indicators/DetailsSectionP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

const { Title } = Typography;

interface IndicatorDrawerProps {
  activeIndicator: IIndicator;
  visible: boolean;
  handleClose: () => void;
}

const IndicatorDrawerP: React.FC<IndicatorDrawerProps> = ({
  activeIndicator,
  visible,
  handleClose
}) => (
  <Drawer visible={visible} onClose={handleClose} width={700}>
    <div>
      <Title level={4} editable>
        {activeIndicator.name}
      </Title>
      <DetailsSectionP activeIndicator={activeIndicator} />

      <Divider orientation="left">Description</Divider>
      <DescriptionP description={activeIndicator.description} />

      <Divider orientation="left">
        Comments ({activeIndicator.comments.length})
      </Divider>
      <div style={{ width: "85%" }}>
        {activeIndicator.comments.length > 0 && (
          <CommentListP comments={activeIndicator.comments} />
        )}
        <Comment
          content={<AddCommentFormP />}
          avatar={<Avatar icon="user" />}
        />
      </div>
    </div>
  </Drawer>
);

export default IndicatorDrawerP;
