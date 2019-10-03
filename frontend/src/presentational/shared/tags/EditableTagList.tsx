import { Button, Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import TagStore from "stores/TagStore";
import ITag from "ts/interfaces/ITag";

const { Option } = Select;

// -----

interface FormProps {
  existingTags: ITag[];
  tagStore?: TagStore;
}

// don't use this component directly
class DumbEditTagsForm extends React.Component<FormProps & FormComponentProps> {
  componentDidMount() {
    const { tagStore } = this.props;
    tagStore!.loadTags();
  }

  render() {
    const { existingTags, form, tagStore } = this.props;
    const { getFieldDecorator } = form;

    // generate options from our list of all tags
    const allTagOptions = tagStore!.tags.map(tag => (
      <Option key={tag.name}>{tag.name}</Option>
    ));

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item>
          {getFieldDecorator("tags")(
            <Select
              mode="tags"
              placeholder="Select tags"
              defaultValue={existingTags.map(tag => tag.name)}
              tokenSeparators={[","]}
              style={{ width: "100%" }}
            >
              {allTagOptions}
            </Select>
          )}
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

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent page reload
    event.preventDefault();

    // validate fields
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        console.log(values);
      }
    });
  }
}

// -----

// our smart form
const EditTagsForm = Form.create<FormProps & FormComponentProps>()(
  inject("tagStore")(observer(DumbEditTagsForm))
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
