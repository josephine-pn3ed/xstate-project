import { IWashingContext, IWashingEvent } from "../../types";
import { assign, ActionFunctionMap } from "xstate";

const actions: ActionFunctionMap<IWashingContext, IWashingEvent> = {
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
    timer: (ctx, _) => 10,
  }),
  setTimeToDry: assign({
    timer: (ctx, _) => 5,
  }),
  setTimeToDrain: assign({
    timer: (ctx, _) => 5,
  }),
  emptyWaterLvl: assign({
    water_level: (ctx, _) => 1,
  }),
  draining: assign({
    laundry_soap: (ctx, _) => "",
    water_level: (ctx, _) => 1,
  }),
  drying: assign({
    water_level: (ctx, _) => 0,
  }),
  unloading: assign({
    laundry: (ctx, _) => 0,
  }),
  setTime: assign({
    timer: (ctx) => 3,
  }),
  decrementTime: assign({
    timer: (ctx) => ctx.timer - 1,
  })
};
export default actions;
