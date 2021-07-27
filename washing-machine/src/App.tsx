import "./App.css";
import React, { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { Grid, Container, Button } from "@material-ui/core";
import { WashingMachine } from "./components/WashingMachine";
import { spawnMachine } from "./machine";
import { StateValue } from "xstate";

const App: React.FC = () => {
  const [state, send] = useMachine(spawnMachine({
  }));
  const { context, value } = state;
  // const [isNotIdle , setIsNoteIdle] = useState(false)

  // useEffect(() => {
  //   if(!state.matches('idle')){
  //     console.log('HALO')
  //     // localStorage.setItem("drained", "laundryHasBeenDrained");
  //     setIsNoteIdle(true)
  //   }else{
  //     setIsNoteIdle(false)
  //   }
  // } , [value])

  // if(state.matches('automatic.draining')){
  //   console.log('HALO')
  //   // localStorage.setItem("drained", "laundryHasBeenDrained");

  // }

  let val: StateValue = typeof value === "string" ? value : value.automatic;
  const isNotIdle: boolean = val !== "idle" ? true : false;
  if (val === "draining" && typeof value === "string") {
    localStorage.setItem("drained", "laundryHasBeenDrained");
  }
  console.log(state.context.timer, state,"timer");
  console.log(val, "value");
  

  // console.log(state.context, state.value, localStorage.getItem("drained"));
  return (
    <div className="App-header">
      <Container maxWidth="sm">
        <WashingMachine value={val} context={state.context} />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("LOAD_WATER")}
              disabled={isNotIdle}
            >
              LOAD WATER
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("LOAD_SOAP")}
              disabled={isNotIdle || context.water_level <= 0}
            >
              LOAD SOAP
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("LOAD_LAUNDRY")}
              disabled={isNotIdle}
            >
              LOAD LAUNDRY
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("WASH")}
              disabled={
                (context.water_level <= 0 && context.laundry <= 0) ||
                context.water_level <= 0 ||
                context.laundry <= 0 ||
                isNotIdle
              }
            >
              WASH
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("DRAIN")}
              disabled={
                (context.water_level <= 1 && context.laundry_soap === "") ||
                isNotIdle
              }
            >
              DRAIN
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("DRY") && localStorage.removeItem("drained")}
              disabled={
                !localStorage.getItem("drained") ||
                isNotIdle ||
                (context.laundry <= 0 && context.water_level <= 0)
              }
            >
              DRY
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("AUTOMATIC")}
              disabled={
                (context.water_level <= 0 && context.laundry <= 0) ||
                context.water_level <= 0 ||
                context.laundry <= 0 ||
                isNotIdle
              }
            >
              AUTOMATIC
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => send("UNLOAD")}
              disabled={
                context.water_level > 0 || context.laundry <= 0 || isNotIdle
              }
            >
              UNLOAD
            </Button>
          </Grid>
          {/* <Grid item xs={3}>
            <Button fullWidth variant="contained" onClick={() => send("DONE")}>
              DONE
            </Button>
          </Grid> */}
        </Grid>
        {/* )} */}
      </Container>
    </div>
  );
};

export default App;
