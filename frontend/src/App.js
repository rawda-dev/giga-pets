import React from "react";
import { Button } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { WithNavbar } from "./pages/WithNavbar";
function App() {
  return (
    <WithNavbar>
      <h2>Hello World</h2>
    </WithNavbar>
  );
}

export default App;
