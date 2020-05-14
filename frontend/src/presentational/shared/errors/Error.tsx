import { Layout, Result } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import UIStore from "stores/UIStore";

const { Content } = Layout;

interface Props {
  title: string;
  subtitle: string;
  uiStore?: UIStore;
}

function Error({ title, subtitle, uiStore }: Props) {
  return (
    <Content
      style={{
        backgroundColor: uiStore!.theme === "LIGHT" ? "#fff" : "#141414",
        padding: 24,
        height: "100%"
      }}
    >
      <Result status="error" title={title} subTitle={subtitle} />
    </Content>
  );
}

export default inject("uiStore")(observer(Error));
