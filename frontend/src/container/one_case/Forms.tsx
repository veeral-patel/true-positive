import { RouteComponentProps } from "@reach/router";
import { Layout } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

const { Content } = Layout;

interface Props extends RouteComponentProps {
  uiStore?: UIStore;
}

function Forms({ uiStore }: Props) {
  return (
    <Content
      style={{
        backgroundColor: uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
        padding: 24,
        margin: 0,
        minHeight: 280
      }}
    >
      <h3>Forms (4)</h3>
    </Content>
  );
}

export default inject("uiStore")(observer(Forms));
