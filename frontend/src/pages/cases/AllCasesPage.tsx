import { RouteComponentProps } from "@reach/router";
import { Button, Dropdown, Icon, Menu, PageHeader } from "antd";
import CasesTable from "container/cases/CasesTable";
import FilterInput from "container/cases/FilterInput";
import React from "react";

const menu = (
  <Menu>
    <Menu.Item key="add_tags">Add Tags</Menu.Item>
    <Menu.Item key="remove_tags">Remove Tags</Menu.Item>
    <Menu.Item key="add_comment">Add Comment</Menu.Item>
    <Menu.Item key="change_status">Change Status</Menu.Item>
    <Menu.Item key="change_priority">Change Priority</Menu.Item>
    <Menu.Item key="assign">Assign</Menu.Item>
  </Menu>
);

const AllCasesPage: React.FC<RouteComponentProps> = () => (
  <div>
    <PageHeader
      title={<h2>Cases</h2>}
      backIcon={false}
      style={{ paddingLeft: 0 }}
      extra={[<Button type="primary">Create Case</Button>]}
    />
    <span
      style={{ marginBottom: "30px", width: "40%", display: "inline-block" }}
    >
      <FilterInput />
    </span>
    <span style={{ float: "right", paddingRight: "24px" }}>
      <Dropdown overlay={menu}>
        <Button>
          Actions <Icon type="down" />
        </Button>
      </Dropdown>
    </span>
    <CasesTable />
  </div>
);

export default AllCasesPage;
