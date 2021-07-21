import "./App.css";
import React from "react";
import { Grid, Container, Button } from "@material-ui/core";
import { WashingMachine } from "./components/WashingMachine";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <WashingMachine />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined">
              LOAD
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined">
              DRAIN
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined">
            UNLOAD
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined">
            WASH
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined">
            CANCEL
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined">
            DRY
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined">
            DONE
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
