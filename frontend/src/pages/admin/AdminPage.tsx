import { RouteComponentProps } from "@reach/router";
import AdminTabsP from "presentational/admin/AdminTabsP";
import React from "react";

class AdminPage extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div>
        <div style={{ marginBottom: "25px" }}>
          <h2>Admin</h2>
        </div>
        <div style={{ width: "60%" }}>
          <AdminTabsP />
        </div>
      </div>
    );
  }
}

export default AdminPage;
