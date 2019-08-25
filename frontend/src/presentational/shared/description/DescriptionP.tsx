import "presentational/shared/description/DescriptionP.css";
import React from "react";
import ReactQuill from "react-quill";

interface DescriptionProps {
  description: string;
}

const DescriptionP: React.FC<DescriptionProps> = ({ description }) => (
  <ReactQuill value={description} />
);

export default DescriptionP;
