import { WashingContext, WashingEvent } from "../../types";
import { assign, ActionFunctionMap } from "xstate";

const actions: ActionFunctionMap<WashingContext, WashingEvent> = {
  loadWater: assign({
    water_level: (ctx, _) => 8,
  }),
  loadSoap: assign({
    laundry_soap: (ctx, _) => "Calla",
  }),
  loadLaundry: assign({
    laundry: (ctx, _) => 10,
  }),
  setTimeToWash: assign({
    timer: (ctx, _) => 5000,
  }),
  emptyWaterLvl: assign({
    water_level: (ctx, _) => 1,
  }),
  setTimeToDry: assign({
    timer: (ctx, _) => 5000,
  }),
  draining: assign({
    water_level: (ctx, _) => 1,
    laundry_soap: (ctx, _) => "",
  }),
  drying: assign({
    water_level: (ctx, _) => 0,
  }),
  unloading: assign({
    laundry: (ctx, _) => 0,
  }),
  timerCountdown: assign({
    timer: (ctx) => (ctx.timer - 1),
  }),
  setTime: assign({
    timer: (ctx) => 3,
  })
};
export default actions;
