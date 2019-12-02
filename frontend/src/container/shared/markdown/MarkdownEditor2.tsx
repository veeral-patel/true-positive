import converter from "container/shared/markdown/converter";
import * as React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

interface Props {
  value?: string;
  onChange?: (newValue: string) => void;
}

// used for writing comments
function MarkdownEditor2({ value, onChange }: Props) {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "preview"
  );

  return (
    <ReactMde
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

export default MarkdownEditor2;
