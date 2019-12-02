import { Button } from "antd";
import converter from "container/shared/markdown/converter";
import * as React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

interface Props {
  // the initial value in the textarea
  initialValue: string;

  // fired after clicking the Update button
  updateValue: (newValue: string) => void;

  // whether to show the update button
  showButton?: boolean;
}

// used in descriptions
function MarkdownEditor({
  initialValue,
  updateValue,
  showButton = true
}: Props) {
  const [currentValue, setValue] = React.useState(initialValue);
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "preview"
  );

  return (
    <>
      <ReactMde
        value={currentValue}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      {showButton && (
        <Button
          style={{ marginTop: "0.5em", float: "right" }}
          onClick={() => updateValue(currentValue)}
        >
          Update
        </Button>
      )}
    </>
  );
}

export default MarkdownEditor;
