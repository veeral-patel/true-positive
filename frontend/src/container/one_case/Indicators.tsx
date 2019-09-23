import { RouteComponentProps } from "@reach/router";
import {
  Button,
  Divider,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Typography
} from "antd";
import AddFileIndicatorModal from "container/one_case/AddFileIndicatorModal";
import { inject, observer } from "mobx-react";
import IndicatorInputP from "presentational/shared/indicators/IndicatorInputP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

const { Content } = Layout;
const { Paragraph } = Typography;

interface Props extends RouteComponentProps {
  activeCaseStore?: ActiveCaseStore;
}

interface State {
  openModal: "ADD_FILE_INDICATOR" | null;
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
            <Menu.Item>
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
                  <h2>Indicators ({activeCase.indicators.length})</h2>
                  <Paragraph>
                    An indicator is a string (like a file hash), file (like a
                    malware sample), or text (like a Snort rule) that implies a
                    compromise.
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
                    <Button type="link" style={{ color: "rgb(130, 130, 130)" }}>
                      Add textual indicator
                    </Button>
                    <Divider type="vertical" />
                    <Dropdown overlay={bulkImportMenu}>
                      <Button
                        type="link"
                        style={{ color: "rgb(130, 130, 130)" }}
                      >
                        Bulk import
                        <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </div>
                  <div>
                    <IndicatorInputP />
                  </div>
                </section>
              </Content>
              <AddFileIndicatorModal
                visible={openModal === "ADD_FILE_INDICATOR"}
                handleClose={() => this.setState({ openModal: null })}
              />
            </div>
          );
      }
    }
  )
);
