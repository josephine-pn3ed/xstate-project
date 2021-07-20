import "./App.css";
import React from "react";
import { Grid, Container, Button, TextField } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Water" variant="outlined" />
            {/* <Button fullWidth variant="outlined">
              LOAD[water|laundry|laundry soap]
            </Button> */}
            <TextField fullWidth label="Laundry" variant="outlined" />
            <TextField fullWidth label="Laundry Soap" variant="outlined" />
            <TextField fullWidth label="Timer" variant="outlined" />
          </Grid>
          HEHE, I don't know unsa akong i design mga bess.
          <Grid item xs={12}>
            <Button fullWidth variant="outlined">
              LOAD[water|laundry]
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined">
              LOAD[water]
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
