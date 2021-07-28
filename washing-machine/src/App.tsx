import "./App.css";
import React from "react";
import { useMachine } from "@xstate/react";
import { Grid, Container, Button } from "@material-ui/core";
import { WashingMachine } from "./components/WashingMachine";
import { spawnMachine } from "./machine";
import { StateValue } from "xstate";

const App: React.FC = () => {
  const [state, send] = useMachine(spawnMachine({}));

  const { context, value } = state;

  const substate: StateValue = typeof value === "string" ? value : value.automatic;

  const loadWater = () => send("LOAD_WATER");

  const loadSoap = () => send("LOAD_SOAP");

  const loadLaundry = () => send("LOAD_LAUNDRY");

  const wash = () => send("WASH");

  const drain = () => send("DRAIN");

  const dry = () => send("DRY");

  const automatic = () => send("AUTOMATIC");

  const unload = () => send("UNLOAD");

  console.log(value, state.context, "timer");

  return (
    <div className="App-header">
      <Container maxWidth="sm">
        <WashingMachine value={substate} context={state.context} />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={loadWater}
              disabled={context.water_level > 1 || !state.matches("idle")}
            >
              LOAD WATER
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={loadSoap}
              disabled={
                context.water_level <= 1 ||
                !!context.laundry_soap ||
                !state.matches("idle")
              }
            >
              LOAD SOAP
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={loadLaundry}
              disabled={context.laundry !== 0 || !state.matches("idle")}
            >
              LOAD LAUNDRY
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={wash}
              disabled={
                context.water_level <= 1 ||
                context.laundry <= 0 ||
                !state.matches("idle")
              }
            >
              WASH
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={drain}
              disabled={
                (context.water_level <= 1) ||
                !state.matches("idle")
              }
            >
              DRAIN
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={dry}
              disabled={
                !localStorage.getItem("drained") ||
                !state.matches("idle") ||
                context.water_level !== 1
              }
            >
              DRY
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={automatic}
              disabled={
                (context.water_level <= 0 && context.laundry <= 0) ||
                context.water_level <= 0 ||
                context.laundry <= 0 ||
                context.laundry_soap === "" ||
                !state.matches("idle")
              }
            >
              AUTOMATIC
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={unload}
              disabled={
                !!context.water_level ||
                !context.laundry ||
                !state.matches("idle")
              }
            >
              UNLOAD
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
