import { useQuery } from "@apollo/react-hooks";
import { Button, Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import GET_TAGS from "queries/getTags";
import React, { useState } from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import TagStore from "stores/TagStore";
import ITag from "ts/interfaces/ITag";

const { Option } = Select;

// -----

interface FormProps {
  /* the list of existing tags this case/task/etc posseses */
  existingTags: ITag[];

  /* used to fetch all existing tags for autocomplete */
  tagStore?: TagStore;

  /* used for the 'update tags' operation */
  activeCaseStore?: ActiveCaseStore;

  /* the ID of the task or case we're commenting on */
  objectId: number | null;

  /* the type of object we're commenting on */
  type: "CASE" | "TASK" | "INDICATOR";

  /* function that's called when you click Cancel */
  handleCancel: () => void;
}

interface TagData {
  tags: ITag[];
}

// don't use this component directly
// class DumbEditTagsForm extends React.Component<FormProps & FormComponentProps> {
//   componentDidMount() {
//     const { tagStore } = this.props;
//     tagStore!.loadTags();
//   }

//   render() {
//     const { existingTags, form, tagStore, handleCancel } = this.props;
//     const { getFieldDecorator } = form;

//     // generate options from our list of all tags
//     const allTagOptions = tagStore!.tags.map(tag => (
//       <Option key={tag.name}>{tag.name}</Option>
//     ));

//     return (
//       <Form onSubmit={this.handleSubmit.bind(this)}>
//         <Form.Item>
//           {getFieldDecorator("tags", {
//             initialValue: existingTags.map(tag => tag.name)
//           })(
//             <Select
//               mode="tags"
//               placeholder="Select tags"
//               tokenSeparators={[","]}
//               style={{ width: "100%" }}
//             >
//               {allTagOptions}
//             </Select>
//           )}
//         </Form.Item>
//         <Form.Item>
//           <Button type="link" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button htmlType="submit">Save</Button>
//         </Form.Item>
//       </Form>
//     );
//   }

//   handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     // prevent page reload
//     event.preventDefault();

//     // validate fields
//     const { form, activeCaseStore, objectId, type } = this.props;
//     form.validateFields((errors, values) => {
//       if (!errors) {
//         if (objectId) activeCaseStore!.changeTags(values.tags, objectId, type);
//       }
//     });
//   }
// }

function DumbEditTagsForm(props: FormProps & FormComponentProps) {
  // runs when form is submitted
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent page reload
    event.preventDefault();

    // validate fields
    const { form, activeCaseStore, objectId, type } = props;
    form.validateFields((errors, values) => {
      if (!errors) {
        if (objectId) activeCaseStore!.changeTags(values.tags, objectId, type);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  const { loading, error, data } = useQuery<TagData>(GET_TAGS);

  let allTagOptions: React.ReactNode[] = [];

  if (loading) {
    allTagOptions = [<Option key="loading">Loading...</Option>];
  } else if (error) {
    allTagOptions = [<Option key="error">Failed to fetch tags</Option>];
  } else if (data) {
    allTagOptions = data.tags.map(tag => (
      <Option key={tag.name}>{tag.name}</Option>
    ));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("tags", {
          initialValue: props.existingTags.map(tag => tag.name)
        })(
          <Select
            mode="tags"
            placeholder="Select tags"
            tokenSeparators={[","]}
            style={{ width: "100%" }}
          >
            {allTagOptions}
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="link" onClick={props.handleCancel}>
          Cancel
        </Button>
        <Button htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
}

// -----

// our smart form
const EditTagsForm = Form.create<FormProps & FormComponentProps>()(
  inject("tagStore", "activeCaseStore")(observer(DumbEditTagsForm))
);

// -----

interface ListProps {
  /* the list of existing tags this case/task/etc posseses */
  existingTags: ITag[];

  /* the ID of the task or case we're commenting on */
  objectId: number | null;

  /* the type of object we're commenting on */
  type: "CASE" | "TASK" | "INDICATOR";
}

function EditableTagList({ existingTags, objectId, type }: ListProps) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <EditTagsForm
        existingTags={existingTags}
        objectId={objectId}
        type={type}
        handleCancel={() => setEditing(false)}
      />
    );
  } else {
    return (
      <div>
        {existingTags.length === 0 ? (
          "N/A"
        ) : (
          <ListOfTagsP tags={existingTags} />
        )}
        <Button type="link" onClick={() => setEditing(true)}>
          Edit
        </Button>
      </div>
    );
  }
}

export default EditableTagList;
