import { RouteComponentProps } from "@reach/router";
import { Button, Divider, Empty, Icon, Layout, Menu, Typography } from "antd";
import AddFileIndicatorModal from "container/one_case/AddFileIndicatorModal";
import AddTextIndicatorModal from "container/one_case/AddTextIndicatorModal";
import CreateIndicatorInput from "container/one_case/CreateIndicatorInput";
import ImportIndicatorsFromCSVModal from "container/one_case/ImportIndicatorsFromCSVModal";
import IndicatorList from "container/one_case/IndicatorList";
import { inject, observer } from "mobx-react";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { Content } = Layout;
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

interface State {
  openModal:
    | "ADD_FILE_INDICATOR"
    | "ADD_TEXT_INDICATOR"
    | "IMPORT_FROM_CSV"
    | null;
}

export default inject("activeCaseStore")(
  observer(
    class Indicators extends React.Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = {
          openModal: null
        };
      }

      render() {
        const { activeCaseStore } = this.props;
        const { openModal } = this.state;

        const activeCase = activeCaseStore!.activeCase;

        const bulkImportMenu = (
          <Menu>
            <Menu.Item
              onClick={() => this.setState({ openModal: "IMPORT_FROM_CSV" })}
            >
              <Icon type="file-excel" />
              Import from CSV
            </Menu.Item>
            <Menu.Item>
              <Icon type="file-text" />
              Extract from text
            </Menu.Item>
          </Menu>
        );

        // should always render, since we're catching errors and showing spinner above this component
        if (activeCase)
          return (
            <div>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <section>
                  <h3>Indicators ({activeCase.indicators.length})</h3>
                  <Paragraph>
                    An indicator can be a string (like a file hash), a piece of
                    text (like a Snort rule), or a file.
                  </Paragraph>
                </section>
                <section>
                  <div style={{ float: "right", marginBottom: "6px" }}>
                    <Button
                      type="link"
                      style={{ paddingLeft: 0, color: "rgb(130, 130, 130)" }}
                      onClick={() =>
                        this.setState({ openModal: "ADD_FILE_INDICATOR" })
                      }
                    >
                      Add file indicator
                    </Button>
                    <Button
                      type="link"
                      style={{ color: "rgb(130, 130, 130)" }}
                      onClick={() =>
                        this.setState({ openModal: "ADD_TEXT_INDICATOR" })
                      }
                    >
                      Add text indicator
                    </Button>
                    <Divider type="vertical" />
                    {/* <Dropdown overlay={bulkImportMenu}>
                      <Button
                        type="link"
                        style={{ color: "rgb(130, 130, 130)" }}
                      >
                        Bulk import
                        <Icon type="down" />
                      </Button>
                    </Dropdown> */}
                  </div>
                  <div style={{ marginBottom: "2em" }}>
                    {/* for adding string indicators */}
                    <CreateIndicatorInput
                      handleEnter={(
                        event: React.KeyboardEvent<HTMLInputElement>
                      ) => {
                        const newIndicator = event.currentTarget.value;

                        // make a list of this case's existing indicators
                        const existingIndicators = activeCase.indicators.map(
                          indicator => indicator.name
                        );

                        // add the new indicator to the case
                        activeCaseStore!.createStringIndicator(
                          activeCase.id,
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
              <ImportIndicatorsFromCSVModal
                visible={openModal === "IMPORT_FROM_CSV"}
                handleClose={() => this.setState({ openModal: null })}
              />
            </div>
          );
      }
    }
  )
);
