import { Empty, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { useQuery } from "models";
import React from "react";
import ITag from "ts/interfaces/ITag";

const { Option } = Select;

interface TagSelectProps {
  existingTags: ITag[]; // to pre-populate our tag select
}

const TagSelect: React.FC<TagSelectProps> = observer(({ existingTags }) => {
  // fetch the list of tags
  const { data, loading, error } = useQuery(store => store.queryTags());

  // handle loading and error statuses
  if (loading) return <Spin />;
  if (error || !data) return <Empty />;

  // generate options from our list of all tags
  const allTagOptions = data.tags.map(tag => (
    <Option key={tag.id}>{tag.name}</Option>
  ));

  // generate one option for each existing tag
  return (
    <Select
    mode="tags"
    placeholder="Select tags"
    defaultValue={existingTags.map(tag => tag.name)}
    style={{ minWidth: "200px" }}
  >
    {allTagOptions}
  </Select>
  );
});

export default TagSelect;
