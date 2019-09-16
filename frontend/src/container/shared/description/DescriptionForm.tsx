import { Button } from "antd";
import "container/shared/description/DescriptionForm.css";
import React from "react";
import ReactQuill from "react-quill";

interface DescriptionProps {
  // the initial value in the textarea
  initialDescription: string;
}

interface DescriptionState {
  // the current value in the textarea (after any changes)
  description: string;
}

class DescriptionForm extends React.Component<
  DescriptionProps,
  DescriptionState
> {
  constructor(props: DescriptionProps) {
    super(props);
    this.state = {
      description: props.initialDescription
    };
  }

  render() {
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"]
      ]
    };

    const { description } = this.state;

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
