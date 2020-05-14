import { useQuery } from "@apollo/react-hooks";
import { Button, Form, Select } from "antd";
import { inject, observer } from "mobx-react";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import GET_TAGS from "queries/getTags";
import React, { useState } from "react";
import ITag from "ts/interfaces/ITag";

const { Option } = Select;

// -----

interface TagFieldProps {
  onChange?: (value: any) => void;
  value?: any;
}

function TagField({ onChange, value }: TagFieldProps) {
  const { loading, error, data } = useQuery<TagData>(GET_TAGS);

  let allTagOptions: React.ReactNode[] = [];

  if (loading) {
    allTagOptions = [
      <Option key="loading" value="loading">
        Loading...
      </Option>
    ];
  } else if (error) {
    allTagOptions = [
      <Option key="error" value="error">
        Failed to fetch tags
      </Option>
    ];
  } else if (data) {
    allTagOptions = data.tags.map(tag => (
      <Option key={tag.name} value={tag.name}>
        {tag.name}
      </Option>
    ));
  }
  return (
    <Select
      mode="tags"
      placeholder="Select tags"
      tokenSeparators={[","]}
      style={{ width: "100%" }}
      onChange={onChange}
      value={value}
    >
      {allTagOptions}
    </Select>
  );
}

// -----

interface FormProps {
  /* the list of existing tags this case/task/etc posseses */
  existingTags: ITag[];

  /* Called to update the list of tags on the server */
  handleFinish: (tags: string[]) => void;

  /* function that's called when you click Cancel */
  handleCancel: () => void;
}

interface TagData {
  tags: ITag[];
}

const EditTagsForm = inject("activeCaseStore")(
  observer(function InnerForm({
    handleFinish,
    existingTags,
    handleCancel
  }: FormProps) {
    return (
      <Form
        colon={false}
        layout="vertical"
        onFinish={values => handleFinish(values.tags)}
        initialValues={{
          tags: existingTags.map(tag => tag.name)
        }}
      >
        <Form.Item name="tags">
          <TagField />
        </Form.Item>
        <Form.Item>
          <>
            <Button
              type="link"
              onClick={handleCancel}
              style={{ paddingLeft: 0 }}
            >
              Cancel
            </Button>
            <Button htmlType="submit">Save</Button>
          </>
        </Form.Item>
      </Form>
    );
  })
);

// -----

interface ListProps {
  /* the list of existing tags this case/task/etc posseses */
  existingTags: ITag[];

  /* Called to update the list of tags on the server */
  handleFinish: (tags: string[]) => void;
}

function EditableTagList({ existingTags, handleFinish }: ListProps) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <EditTagsForm
        existingTags={existingTags}
        handleFinish={handleFinish}
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

export { TagField };
export default EditableTagList;
