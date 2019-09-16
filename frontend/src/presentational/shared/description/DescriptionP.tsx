import { Button } from "antd";
import "presentational/shared/description/DescriptionP.css";
import React from "react";
import ReactQuill from "react-quill";

interface DescriptionProps {
  description: string;
}

const DescriptionP: React.FC<DescriptionProps> = ({ description }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ]
  };

  return (
    <div>
      <ReactQuill value={description} modules={modules} />
      <Button style={{ marginTop: "15px", float: "right" }}>
        Update Description
      </Button>
    </div>
  );
};

export default DescriptionP;
