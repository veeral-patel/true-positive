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
  currentDescription: string;
}

class DescriptionForm extends React.Component<
  DescriptionProps,
  DescriptionState
> {
  constructor(props: DescriptionProps) {
    super(props);
    this.state = {
      currentDescription: props.initialDescription
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

    const { currentDescription } = this.state;

    return (
      <div>
        <ReactQuill
          value={currentDescription}
          modules={modules}
          onChange={newDescription =>
            this.setState({ currentDescription: newDescription })
          }
        />
        <Button style={{ marginTop: "15px", float: "right" }}>
          Update Description
        </Button>
      </div>
    );
  }
}

export default DescriptionForm;
