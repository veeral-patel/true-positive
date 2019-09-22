import { RouteComponentProps } from "@reach/router";
import { Button, Divider, Layout, Typography } from "antd";
import { inject, observer } from "mobx-react";
import IndicatorInputP from "presentational/shared/indicators/IndicatorInputP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { Content } = Layout;
const { Paragraph } = Typography;

interface IndicatorsProps extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

export default inject("activeCaseStore")(
  observer(
    class Indicators extends React.Component<IndicatorsProps> {
      render() {
        const { activeCaseStore } = this.props;
        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing spinner above this component
        if (activeCase)
          return (
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <section>
                <h2>Indicators ({activeCase.indicators.length})</h2>
                <Paragraph>
                  An indicator is a string (ie, a file hash, domain, URL, or
                  IP), file (ie, a malware sample), or text (ie, a Snort rule or
                  Yara signature) that implies a compromise.
                </Paragraph>
              </section>
              <section>
                <div style={{ float: "right", marginBottom: "6px" }}>
                  <Button type="link" style={{ paddingLeft: 0 }}>
                    Add file indicator
                  </Button>
                  <Button type="link">Add textual indicator</Button>
                  <Divider type="vertical" />
                  <Button type="link">Bulk import</Button>
                </div>
                <div>
                  <IndicatorInputP />
                </div>
              </section>
            </Content>
          );
      }
    }
  )
);
