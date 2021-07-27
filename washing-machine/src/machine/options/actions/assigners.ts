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
    timer: (ctx, _) => 10000,
  }),
  setTimeToZero: assign({
    timer: (ctx, _) => 0,
  }),
  setTimeToDry: assign({
    timer: (ctx, _) => 5000,
  }),

  setTimeToDrain: assign({
    timer: (ctx, _) => 5000,
  }),
  emptyWaterLvl: assign({
    water_level: (ctx, _) => 1,
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
    timer: (ctx) => ((Math.floor(ctx.timer / 1000) % 60) - 1),
  }),
  setTime: assign({
    timer: (ctx) => 3,
  })
};
export default actions;
