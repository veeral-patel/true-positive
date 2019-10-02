import { Select, Spin } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import TagStore from "stores/TagStore";
import ITag from "ts/interfaces/ITag";

const { Option } = Select;

interface Props {
  // to pre-populate our tag select
  existingTags: ITag[];
  tagStore?: TagStore;
}

export default inject("tagStore")(
  observer(
    class TagSelect extends React.Component<Props> {
      componentDidMount() {
        const { tagStore } = this.props;
        tagStore!.loadTags();
      }

      render() {
        const { existingTags, tagStore } = this.props;

        if (tagStore!.tagsAreLoading) return <Spin />;

        // generate options from our list of all tags
        const allTagOptions = tagStore!.tags.map(tag => (
          <Option key={tag.id}>{tag.name}</Option>
        ));

        // generate one option for each existing tag
        return (
          <Select
            mode="tags"
            placeholder="Select tags"
            defaultValue={existingTags.map(tag => tag.name)}
            tokenSeparators={[","]}
            style={{ width: "100%" }}
          >
            {allTagOptions}
          </Select>
        );
      }
    }
  )
);
