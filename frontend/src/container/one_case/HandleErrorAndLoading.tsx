import { Spin } from "antd";
import { inject, observer } from "mobx-react";
import Error from "presentational/shared/errors/Error";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface HandleErrorAndLoadingProps {
  activeCaseStore?: ActiveCaseStore;
}

const HandleErrorAndLoading: React.FC<HandleErrorAndLoadingProps> = ({
  children,
  activeCaseStore
}) => {
  if (activeCaseStore!.activeCaseIsLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          padding: "30px 50px",
          margin: "20px 0"
        }}
      >
        <Spin size="large" />
      </div>
    );
  } else if (!activeCaseStore!.activeCase) {
    return (
      <Error
        title="Could not fetch case"
        subtitle="Please ensure that the case exists and that your Internet connection is working."
      />
    );
  } else {
    return <div>{children}</div>;
  }
};

export default inject("activeCaseStore")(observer(HandleErrorAndLoading));
