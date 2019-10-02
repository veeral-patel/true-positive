import { Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import TagSelect from "container/shared/tags/TagSelect";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import ITag from "ts/interfaces/ITag";

// -----

interface FormProps {
  existingTags: ITag[];
}

// don't use this component directly
class DumbEditTagsForm extends React.Component<FormProps & FormComponentProps> {
  render() {
    const { existingTags } = this.props;
    return (
      <Form>
        <Form.Item>
          <TagSelect existingTags={existingTags} />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => this.setState({ editing: false })}
            htmlType="submit"
          >
            Save
          </Button>
          <Button type="link" onClick={() => this.setState({ editing: false })}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const EditTagsForm = Form.create<FormProps & FormComponentProps>()(
  DumbEditTagsForm
);

// -----

interface ListProps {
  existingTags: ITag[];
}

interface ListState {
  editing: boolean;
}

class EditableTagList extends React.Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      editing: false
    };
  }
  render() {
    const { editing } = this.state;
    const { existingTags } = this.props;

    if (editing) {
      return <EditTagsForm existingTags={existingTags} />;
    } else {
      return (
        <div>
          {existingTags.length === 0 ? (
            "N/A"
          ) : (
            <ListOfTagsP tags={existingTags} />
          )}
          <Button type="link" onClick={() => this.setState({ editing: true })}>
            Edit
          </Button>
        </div>
      );
    }
  }
}

export default EditableTagList;
