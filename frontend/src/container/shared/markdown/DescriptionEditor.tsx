import { Button } from "antd";
import converter from "container/shared/markdown/converter";
import * as React from "react";
import ReactMde from "react-mde";

interface Props {
  // the initial value in the textarea
  initialValue: string;

  // fired after clicking the Update button
  updateValue: (newValue: string) => void;
}

function DescriptionEditor({ initialValue, updateValue }: Props) {
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
      <Button
        style={{ marginTop: "0.5em", float: "right" }}
        onClick={() => updateValue(currentValue)}
      >
        Update
      </Button>
    </>
  );
}

export default DescriptionEditor;
