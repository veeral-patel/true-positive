import converter from "container/shared/markdown/converter";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ReactMde from "react-mde";
import UIStore from "stores/UIStore";

interface Props {
  value?: string;
  onChange?: (newValue: string) => void;
  uiStore?: UIStore;
}

function GenericEditor({ value, onChange, uiStore }: Props) {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  return (
    <div>
      <ReactMde
        minEditorHeight={125}
        minPreviewHeight={125}
        value={value}
        className={uiStore!.theme === "LIGHT" ? "" : "dark"}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        // loadSuggestions={loadSuggestions}
      />
    </div>
  );
}

export default inject("uiStore")(observer(GenericEditor));
