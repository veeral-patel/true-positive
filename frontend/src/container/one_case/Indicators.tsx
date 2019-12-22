import { RouteComponentProps } from "@reach/router";
import { Empty, Layout, Typography } from "antd";
import AddFileIndicatorModal from "container/one_case/AddFileIndicatorModal";
import AddTextIndicatorModal from "container/one_case/AddTextIndicatorModal";
import CreateIndicatorInput from "container/one_case/CreateIndicatorInput";
import IndicatorList from "container/one_case/IndicatorList";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";
import UIStore from "stores/UIStore";

const { Content } = Layout;
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
  uiStore?: UIStore;
}

interface State {
  openModal:
    | "ADD_FILE_INDICATOR"
    | "ADD_TEXT_INDICATOR"
    | "IMPORT_FROM_CSV"
    | null;
}

export default inject(
  "activeCaseStore",
  "uiStore"
)(
  observer(
    class Indicators extends React.Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = {
          openModal: null
        };
      }

      render() {
        const { activeCaseStore, uiStore } = this.props;
        const { openModal } = this.state;

        const activeCase = activeCaseStore!.activeCase;

        // should always render, since we're catching errors and showing spinner above this component
        if (activeCase)
          return (
            <div>
              <Content
                style={{
                  backgroundColor:
                    uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <section>
                  <h3>Indicators ({activeCase.indicators.length})</h3>
                </section>
                <section>
                  <div style={{ marginBottom: "2em", marginTop: "1.5em" }}>
                    {/* for adding string indicators */}
                    <CreateIndicatorInput
                      handleEnter={(
                        event: React.KeyboardEvent<HTMLInputElement>
                      ) => {
                        const newIndicator = event.currentTarget.value;

                        if (newIndicator === "") return;

                        // add the new indicator to the case
                        activeCaseStore!.createStringIndicator(
                          activeCase.id,
                          newIndicator,
                          newIndicator
                        );
                      }}
                    />
                  </div>
                  <div>
                    {activeCase.indicators.length === 0 ? (
                      <Empty
                        description={
                          <div>
                            <h3>No indicators</h3>
                            <Paragraph>Create an indicator above</Paragraph>
                          </div>
                        }
                      />
                    ) : (
                      <IndicatorList indicators={activeCase.indicators} />
                    )}
                  </div>
                </section>
              </Content>
              <AddFileIndicatorModal
                visible={openModal === "ADD_FILE_INDICATOR"}
                handleClose={() => this.setState({ openModal: null })}
              />
              <AddTextIndicatorModal
                visible={openModal === "ADD_TEXT_INDICATOR"}
                handleClose={() => this.setState({ openModal: null })}
              />
            </div>
          );
      }
    }
  )
);
