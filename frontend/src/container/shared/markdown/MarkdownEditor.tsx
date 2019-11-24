import { Button } from "antd";
import * as React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

interface Props {
  // the initial value in the textarea
  initialValue: string;

  // fired after clicking the Update button
  updateValue: (newValue: string) => void;
}

function MarkdownEditor(props: Props) {
  const { initialValue, updateValue } = props;
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

export default MarkdownEditor;
