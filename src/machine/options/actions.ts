import { assign } from "xstate";

module.exports = {
  loadContext: assign({
    water_level: (context, event) => 8,
    laundry: (context, event) => 10,
    laundry_soap: (context, event) => "Calla",
  }),
  removeLaundrySoap: assign({
    laundry_soap: (context, event) => "",
  }),
  removeWaterLevel: assign({
    water_level: (context, event) => 0,
  }),
  setTImer: assign({
    timer: (context, event) => 0,
  }),
  unload: assign({
    laundry: (context, event) => 0,
  }),
};
