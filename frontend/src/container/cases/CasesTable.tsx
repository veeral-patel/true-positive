import { Table } from "antd";
import gql from "graphql-tag";
import CasesTableP from "presentational/cases/CasesTableP";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import ICase from "ts/interfaces/ICase";

interface ICasesData {
  cases: ICase[];
}

const GET_CASES = gql`
  query {
    cases {
      id
      name
      description
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
  const { data, error, loading } = useQuery<ICasesData>(GET_CASES);

  if (loading) {
    return <Table loading={true} />;
  }

  if (error || data == undefined) {
    return <h3>Error</h3>;
  }

  return <CasesTableP dataSource={data.cases} />;
};

export default CasesTable;
