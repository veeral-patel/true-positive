import { Button } from "antd";
import converter from "container/shared/markdown/converter";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ReactMde from "react-mde";
import UIStore from "stores/UIStore";

interface Props {
  // the initial value in the textarea
  initialValue: string;

  // fired after clicking the Update button
  updateValue: (newValue: string) => void;

  // style component based on whether we're in dark theme
  uiStore?: UIStore;
}

function DescriptionEditor({ initialValue, updateValue, uiStore }: Props) {
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
        className={uiStore!.theme === "LIGHT" ? "" : "dark"}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      <div style={{ marginTop: "1.5em" }} />
      {selectedTab === "write" && (
        <div style={{ float: "right" }}>
          <Button
            type="link"
            onClick={() => {
              setValue(initialValue);
              setSelectedTab("preview");
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => updateValue(currentValue)}>Update</Button>
        </div>
      )}
    </>
  );
}

export default inject("uiStore")(observer(DescriptionEditor));
