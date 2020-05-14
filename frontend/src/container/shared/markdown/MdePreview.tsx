import { classNames } from "container/shared/markdown/classNames";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { GenerateMarkdownPreview } from "react-mde/lib/definitions/types";
import UIStore from "stores/UIStore";

export interface ReactMdePreviewProps {
  className?: string;
  previewRef?: (ref: MdePreview) => void;
  loadingPreview?: React.ReactNode;
  generateMarkdownPreview: GenerateMarkdownPreview;
  markdown: string;
  uiStore?: UIStore;
}

export interface ReactMdePreviewState {
  loading: boolean;
  preview?: React.ReactNode;
}

class MdePreview extends React.Component<
  ReactMdePreviewProps,
  ReactMdePreviewState
> {
  previewRef!: HTMLDivElement | null;

  constructor(props: ReactMdePreviewProps) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(): void {
    const { markdown, generateMarkdownPreview } = this.props;
    generateMarkdownPreview(markdown).then(preview => {
      this.setState({
        preview,
        loading: false
      });
    });
  }

  render() {
    const { className, loadingPreview, uiStore } = this.props;
    const { preview, loading } = this.state;
    const finalHtml = loading ? loadingPreview : preview;

    let content;

    if (typeof finalHtml === "string") {
      content = (
        <div
          className="mde-preview-content"
          dangerouslySetInnerHTML={{ __html: finalHtml || "<p>&nbsp;</p>" }}
          ref={p => (this.previewRef = p)}
        />
      );
    } else {
      content = <div className="mde-preview-content">{finalHtml}</div>;
    }

    return (
      <div className={uiStore!.theme === "LIGHT" ? "" : "dark"}>
        <div
          className={classNames("mde-preview", { className, loading })}
          data-testid="mde-preview"
        >
          {content}
        </div>
      </div>
    );
  }
}

export default inject("uiStore")(observer(MdePreview));
