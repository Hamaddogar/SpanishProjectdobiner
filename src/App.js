import React from "react";
import "./App.css";
import Table from "./components/Table";
import NavBar from "./components/NavBar";
import Nav from "./components/Nav";
import Checkbox from "./components/Checkbox";
import Grid from "./components/Grid";

import "./styles/general.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="wrap">
        <Grid title={"hello"} />
      </div>
    </>
  );
}

export default App;
