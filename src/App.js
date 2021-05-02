import React from "react";
import Maze from "./Maze";

const rows = parseInt(prompt("Enter number of rows"));
const columns = parseInt(prompt("Enter number of columns"));
const App = () => {
  if (!rows || !columns) {
    return "Please enter valid number for both rows and columns";
  }
  if (rows <= 2) {
    return "Please enter minimum 3*3";
  }
  return <Maze rows={rows} columns={columns} />;
};

export default App;
