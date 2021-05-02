import React from "react";
import Maze from "./Maze";

const rows = parseInt(prompt("Enter number of rows"));
const columns = parseInt(prompt("Enter number of columns"));
const App = () => {
  if (!rows || !columns) {
    return "Please enter valid number for both rows and columns";
  }
  return <Maze rows={rows} columns={columns} />;
};

export default App;
