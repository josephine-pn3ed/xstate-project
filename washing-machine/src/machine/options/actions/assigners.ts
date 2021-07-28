import { IWashingContext, IWashingEvent } from "../../types";
import { assign, ActionFunctionMap } from "xstate";

const actions: ActionFunctionMap<IWashingContext, IWashingEvent> = {
  loadWater: assign({
    water_level: (ctx) => 8,
  }),
  loadSoap: assign({
    laundry_soap: (ctx) => "Calla",
  }),
  loadLaundry: assign({
    laundry: (ctx) => 10,
  }),
  setTimeToWash: assign({
    timer: (ctx) => 10,
  }),
  setTimeToDry: assign({
    timer: (ctx) => 5,
  }),
  setTimeToDrain: assign({
    timer: (ctx) => 5,
  }),
  setTimeToLoadWater: assign({
    timer: (ctx) => 3,
  }),
  emptyWaterLvl: assign({
    water_level: (ctx) => 1,
  }),
  draining: assign({
    laundry_soap: (ctx) => "",
    water_level: (ctx) => 1,
  }),
  drainWaterAndLaundrySoap: assign({
    laundry_soap: (ctx) => "",
    water_level: (ctx) => 0,
  }),
  drying: assign({
    water_level: (ctx) => 0,
  }),
  unloading: assign({
    laundry: (ctx) => 0,
  }),
  setTime: assign({
    timer: (ctx) => 3,
  }),
  decrementTime: assign({
    timer: (ctx) => ctx.timer - 1,
  }),
  decrementAutomaticCounter: assign ({
    automatic_counter: (ctx) => ctx.automatic_counter - 1 ,
  })
};
export default actions;
