import { notification, Table } from "antd";
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
      createdAt
      formattedCreatedAt
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
      tasks {
        id
        name
        status {
          name
        }
        priority {
          name
        }
        tags
      }
    }
  }
`;

const CasesTable: React.FC = () => {
  const { data, error, loading } = useQuery<ICasesData>(GET_CASES);

  if (loading) {
    return <Table loading={true} />;
  }

  if (error) {
    notification.error({
      message: "An error occurred while fetching cases",
      description: error.message
    });
    return <CasesTableP dataSource={[]} />;
  }

  if (data === undefined) {
    notification.error({
      message: "An error occurred while fetching cases",
      description: "data is undefined"
    });
    return <CasesTableP dataSource={[]} />;
  }

  return <CasesTableP dataSource={data.cases} />;
};

export default CasesTable;
