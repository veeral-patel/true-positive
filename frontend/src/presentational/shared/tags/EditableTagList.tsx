import TagSelect from "container/shared/tags/TagSelect";
import ListOfTagsP from "presentational/shared/tags/ListOfTagsP";
import React from "react";
import ITag from "ts/interfaces/ITag";

interface Props {
  existingTags: ITag[];
}

interface State {
  editing: boolean;
}

class EditableTagList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  render() {
    const { editing } = this.state;
    const { existingTags } = this.props;

    if (editing) {
      return <TagSelect existingTags={existingTags} />;
    } else {
      return <ListOfTagsP tags={existingTags} />;
    }
  }
}

export default EditableTagList;
