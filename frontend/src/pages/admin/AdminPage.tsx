import { RouteComponentProps } from "@reach/router";
import { PageHeader } from "antd";
import AdminTabsP from "presentational/admin/AdminTabsP";
import React from "react";

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div>
        <PageHeader
          title="Admin"
          subTitle="Change settings that affect all users"
        />
        <div style={{ width: "60%" }}>
          <AdminTabsP />
        </div>
      </div>
    );
  }
}

export default AdminPage;
