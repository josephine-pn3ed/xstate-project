import "./App.css";
import React from "react";
import { Container, Button } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Button variant="outlined">Hello</Button>
      </Container>
    </div>
  );
};

export default App;
