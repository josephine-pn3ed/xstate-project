import { WashingContext } from "../types";
import { assign } from "xstate";

export const action = {
  loadWaterOnly: assign({
    water_level: 8,
  }),
  loadWaterAndLaundry: assign({
    water_level: 8,
    laundry: 10,
  }),
  loadWaterAndSoap: assign({
    water_level: 8,
    laundry_soap: "Calla",
  }),
  loadWaterLaundryAndSoap: assign({
    water_level: () => 8,
    laundry: () => 10,
    laundry_soap: () => "Calla",
  }),
  setTimeToWash: assign({
    timer: 5000,
  }),
  setTimeToDrain: assign({
    timer: 4000,
  }),
  setTimeToDry: assign({
    timer: 3000,
  }),
  setTimeToZero: assign({
    timer: 0,
  }),
  cancelWashing: assign({
    timer: (ctx: WashingContext, _) => ctx.timer / 2,
  }),
  draining: assign({
    water_level: 1,
    laundry_soap: "",
  }),
  cancelDraining: assign({
    water_level: (ctx: WashingContext, _) => ctx.water_level / 2,
    timer: (ctx: WashingContext, _) => ctx.timer / 2,
  }),
  drying: assign({
    water_level: 0,
  }),
  cancelDrying: assign({
    timer: (ctx: WashingContext, _) => ctx.timer / 2,
  }),
  unloading: assign({
    laundry: 0,
  }),
};
