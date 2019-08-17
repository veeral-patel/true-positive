import React from "react";
import CasesTableP from "../../presentational/cases/CasesTableP";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

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
  } else if (loading) {
    return <h3>Loading...</h3>;
  }

  return <CasesTableP dataSource={data.cases} />;
};

export default CasesTable;
