import { Divider, Drawer } from "antd";
import CommentListP from "presentational/shared/comments/CommentListP";
import DescriptionP from "presentational/shared/description/DescriptionP";
import React from "react";
import IIndicator from "ts/interfaces/IIndicator";

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
      <h3>{activeIndicator.name}</h3>

      <Divider orientation="left">Description</Divider>
      <DescriptionP description={activeIndicator.description} />

      <Divider orientation="left">
        Comments ({activeIndicator.comments.length})
      </Divider>
      <CommentListP comments={activeIndicator.comments} />
    </div>
  </Drawer>
);

export default IndicatorDrawerP;
