import { Button } from "antd";
import "container/shared/description/DescriptionForm.css";
import React from "react";
import ReactQuill from "react-quill";

interface DescriptionProps {
  description: string;
}

class DescriptionForm extends React.Component<DescriptionProps> {
  render() {
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"]
      ]
    };

    const { description } = this.props;

    return (
      <div>
        <ReactQuill value={description} modules={modules} />
        <Button style={{ marginTop: "15px", float: "right" }}>
          Update Description
        </Button>
      </div>
    );
  }
}

export default DescriptionForm;
