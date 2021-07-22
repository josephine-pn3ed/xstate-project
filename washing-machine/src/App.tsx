import "./App.css";
import React from "react";
import { useMachine } from "@xstate/react";
import { Grid, Container, Button } from "@material-ui/core";
import { WashingMachine } from "./components/WashingMachine";
import washingMachineDryer from "./machine/config";

const App: React.FC = () => {
  const [state, send] = useMachine(washingMachineDryer);
  console.log(state.context, state.value,);

  const handleOnClick =()=>{
    send({
      type:"LOAD_WATER_LAUNDRY_AND_SOAP"
    })
  }
  return (
    <div className="App">
      <Container maxWidth="sm">
        <WashingMachine />
        {state.value !== "idle" ? (
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleOnClick}
              >
                LOAD
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => send("DRAIN")}
              >
                DRAIN
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="outlined">
                UNLOAD
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="outlined" onClick={() => send("WASH")}>
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
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleOnClick}
              >
                LOAD
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => send("DRAIN")}
              >
                DRAIN
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default App;
