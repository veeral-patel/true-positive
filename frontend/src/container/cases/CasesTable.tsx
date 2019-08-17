import { Table } from "antd";
import gql from "graphql-tag";
import CasesTableP from "presentational/cases/CasesTableP";
import React from "react";
import { useQuery } from "react-apollo-hooks";

const GET_CASES = gql`
  query {
    cases {
      id
      name
      createdAt
      priority {
        name
      }
      status {
        name
      }
      createdBy {
        username
      }
      assignedTo {
        username
      }
      tags
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
