import { Context } from "vm";
import { assign, EventObject } from "xstate";

module.exports = {
  loadWaterOnly: assign({
    water_level: (ctx: Context, evt: EventObject) => 8,
  }),
  loadWaterAndLaundry: assign({
    water_level: (ctx: Context, evt: EventObject) => 8,
    laundry: (ctx: Context, evt: EventObject) => 10,
  }),
  loadWaterAndSoap: assign({
    water_level: (ctx: Context, evt: EventObject) => 8,
    laundry_soap: (ctx: Context, evt: EventObject) => "Calla",
  }),
  loadWaterLaundryAndSoap: assign({
    water_level: (ctx: Context, evt: EventObject) => 8,
    laundry: (ctx: Context, evt: EventObject) => 10,
    laundry_soap: (ctx: Context, evt: EventObject) => "Calla",
  }),
  setTimeToWash: assign({
    timer: (ctx: Context, evt: EventObject) => 5000,
  }),
  setTimeToDrain: assign({
    timer: (ctx: Context, evt: EventObject) => 4000,
  }),
  setTimeToDry: assign({
    timer: (ctx: Context, evt: EventObject) => 3000,
  }),
  setTimeToZero: assign({
    timer: (ctx: Context, evt: EventObject) => 0,
  }),
  cancelWashing: assign({
    timer: (ctx: Context, evt: EventObject) => ctx.timer / 2,
  }),
  draining: assign({
    water_level: (ctx: Context, evt: EventObject) => 1,
    laundry_soap: (ctx: Context, evt: EventObject) => "",
  }),
  cancelDraining: assign({
    water_level: (ctx: Context, evt: EventObject) => ctx.water_level / 2,
    timer: (ctx: Context, evt: EventObject) => ctx.timer / 2,
  }),
  drying: assign({
    water_level: (ctx: Context, evt: EventObject) => 0,
  }),
  cancelDrying: assign({
    timer: (ctx: Context, evt: EventObject) => ctx.timer / 2,
  }),
  unloading: assign({
    laundry: (ctx: Context, evt: EventObject) => 0,
  }),
};
