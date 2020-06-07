import React, { useState } from "react";
import { Button } from "@material-ui/core";

import "./App.css";

import Sidebar from "./components/Sidebar";

function App() {
  const [value, setValue] = useState(0);

  const incrementValue = () => {
    setValue(value + 1);
  };

  return (
    <div className="App">
      <Sidebar />
    </div>
  );
}

export default App;
