import "./App.css";
import React from "react";
import { useMachine } from "@xstate/react";
import { Grid, Container, Button } from "@material-ui/core";
import { WashingMachine } from "./components/WashingMachine";
import washingMachineDryer from "./machine/config";

const App: React.FC = () => {
  const [state, send] = useMachine(washingMachineDryer);
  console.log(state.context, "-----", state.value);

  return (
    <div className="App-header">
      <Container maxWidth="sm">
        <WashingMachine value={state.value} context={state.context} />
        {/* {(state.value === "idle" || state.value === "loading") && ( */}
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => send("LOAD_WATER")}
              >
                LOAD WATER
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => send("LOAD_SOAP")}
              >
                LOAD SOAP
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => send("LOAD_LAUNDRY")}
              >
                LOAD LAUNDRY
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => send("DRAIN")}
              >
                DRAIN
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => send("UNLOAD")}
              >
                UNLOAD
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => send("WASH")}
              >
                WASH
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="contained">
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={() => send("DRY")}>
                DRY
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => send("DONE")}
              >
                DONE
              </Button>
            </Grid>
          </Grid>
        {/* )} */}
      </Container>
    </div>
  );
};

export default App;
