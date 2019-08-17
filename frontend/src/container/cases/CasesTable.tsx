import React from "react";
import CasesTableP from "../../presentational/cases/CasesTableP";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

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
  console.log(data);

  return <CasesTableP dataSource={dataSource} />;
};

export default CasesTable;
