import { WashingContext, WashingEvent } from "../types";
import { assign, ActionFunctionMap } from "xstate";

const actions: ActionFunctionMap<WashingContext, WashingEvent> = {
  loadWaterOnly: assign({
    water_level: (ctx, _) => 8,
  }),
  loadWaterAndLaundry: assign({
    water_level: (ctx, _) => 8,
    laundry: (ctx, _) => 10,
  }),
  loadWaterAndSoap: assign({
    water_level: (ctx, _) => 8,
    laundry_soap: (ctx, _) => "Calla",
  }),
  loadWaterLaundryAndSoap: assign({
    water_level: (ctx, _) => 8,
    laundry: (ctx, _) => 10,
    laundry_soap: (ctx, _) => "calla",
  }),
  setTimeToWash: assign({
    timer: (ctx, _) => 5000,
  }),
  setTimeToDrain: assign({
    timer: (ctx, _) => 4000,
  }),
  setTimeToDry: assign({
    timer: (ctx, _) => 3000,
  }),
  setTimeToZero: assign({
    timer: (ctx, _) => 0,
  }),
  cancelWashing: assign({
    timer: (ctx: WashingContext, _) => ctx.timer / 2,
  }),
  draining: assign({
    water_level: (ctx, _) => 1,
    laundry_soap: (ctx, _) => "",
  }),
  cancelDraining: assign({
    water_level: (ctx: WashingContext, _) => ctx.water_level / 2,
    timer: (ctx: WashingContext, _) => ctx.timer / 2,
  }),
  drying: assign({
    water_level: (ctx, _) => 0,
  }),
  cancelDrying: assign({
    timer: (ctx: WashingContext, _) => ctx.timer / 2,
  }),
  unloading: assign({
    laundry: (ctx, _) => 0,
  }),
};
export default actions;
