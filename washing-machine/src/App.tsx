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

  const { water_level, laundry, laundry_soap } = context;

  const substate: StateValue =
    typeof value === "string" ? value : value.automatic;

  const loadWater = () => send("LOAD_WATER");

  const loadSoap = () => send("LOAD_SOAP");

  const loadLaundry = () => send("LOAD_LAUNDRY");

  const wash = () => send("WASH");

  const drain = () => send("DRAIN");

  const dry = () => send("DRY");

  const automatic = () => send("AUTOMATIC");

  const unload = () => send("UNLOAD");

  console.log("STATE: ", value, " | CONTEXT: ", context);

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
              disabled={water_level > 1 || !state.matches("idle")}
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
                water_level <= 1 || !!laundry_soap || !state.matches("idle")
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
              disabled={laundry !== 0 || !state.matches("idle")}
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
                water_level <= 1 || laundry <= 0 || !state.matches("idle")
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
              disabled={water_level <= 1 || !state.matches("idle")}
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
                water_level !== 1
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
                (water_level <= 0 && laundry <= 0) ||
                water_level <= 0 ||
                laundry <= 0 ||
                laundry_soap === "" ||
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
              disabled={!!water_level || !laundry || !state.matches("idle")}
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
