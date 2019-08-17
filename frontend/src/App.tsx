import React from "react";
import CasesTable from "./presentational/cases/CasesTable";

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

const App: React.FC = () => {
  return (
    <div>
      <CasesTable dataSource={dataSource} />
    </div>
  );
};

export default App;
