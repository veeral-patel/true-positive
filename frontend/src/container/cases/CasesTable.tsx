import React from "react";
import CasesTableP from "../../presentational/cases/CasesTableP";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Table } from "antd";

const GET_CASES = gql`
  query {
    cases {
      name
      priority {
        name
      }
      status {
        name
      }
      assignedTo {
        username
      }
    }
  }
`;

const CasesTable: React.SFC = () => {
  const { data, error, loading } = useQuery(GET_CASES);

  if (loading) {
    return <Table loading={true} />;
  }

  return error ? <h3>Error</h3> : <CasesTableP dataSource={data.cases} />;
};

export default CasesTable;
