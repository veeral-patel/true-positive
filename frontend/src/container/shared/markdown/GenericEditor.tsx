import converter from "container/shared/markdown/converter";
import { inject, observer } from "mobx-react";
import * as React from "react";
import ReactMde, { Suggestion } from "react-mde";
import UIStore from "stores/UIStore";

interface Props {
  value?: string;
  onChange?: (newValue: string) => void;
  uiStore?: UIStore;
}

function loadSuggestions(text: string): Promise<Suggestion[]> {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          value: "@andre"
        },
        {
          preview: "Angela",
          value: "@angela"
        },
        {
          preview: "David",
          value: "@david"
        },
        {
          preview: "Louise",
          value: "@louise"
        }
      ].filter(i => i.value.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 100);
  });
}

function GenericEditor({ value, onChange, uiStore }: Props) {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  return (
    <ReactMde
      minEditorHeight={125}
      minPreviewHeight={125}
      value={value}
      className={uiStore!.theme === "LIGHT" ? "" : "dark"}
      onChange={onChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      loadSuggestions={loadSuggestions}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  );
}

export default inject("uiStore")(observer(GenericEditor));
