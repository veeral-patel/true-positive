import React from "react";
import CasesTableP from "../../presentational/cases/CasesTableP";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Spin, Table } from "antd";

const GET_CASES = gql`
  query {
    cases {
      id
      name
    }
  }
`;

const CasesTable: React.SFC = () => {
  const { data, error, loading } = useQuery(GET_CASES);

  if (error) {
    alert("Error!");
  }

  if (loading) {
    return <Table loading={true} />;
  }

  return <CasesTableP dataSource={data.cases} />;
};

export default CasesTable;
