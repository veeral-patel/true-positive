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

  return <ReactQuill value={description} modules={modules} />;
};

export default DescriptionP;
