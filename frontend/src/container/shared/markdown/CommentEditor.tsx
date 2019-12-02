import converter from "container/shared/markdown/converter";
import * as React from "react";
import ReactMde from "react-mde";

interface Props {
  value?: string;
  onChange?: (newValue: string) => void;
}

function CommentEditor({ value, onChange }: Props) {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  return (
    <ReactMde
      minEditorHeight={125}
      minPreviewHeight={125}
      value={value}
      onChange={onChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  );
}

export default CommentEditor;
