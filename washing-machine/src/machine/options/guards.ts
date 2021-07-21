import { Context } from "vm";
import { EventObject } from "xstate";

module.exports = {
  laundryNotEmptyAndWaterEmpty: (ctx: Context, _: EventObject) => {
    return ctx.laundry !== 0 && ctx.water_level <= 1;
  },
  laundryAndSoapEmpty: (ctx: Context, _: EventObject) => {
    return ctx.laundry === 0 && ctx.laundry_soap === "";
  },
  laundryNotEmptyAndWaterAndSoapEmpty: (ctx: Context, _: EventObject) => {
    return ctx.laundry !== 0 && ctx.water_level <= 1 && ctx.laundry_soap === "";
  },
  waterAndLaundryEmpty: (ctx: Context, _: EventObject) => {
    return ctx.water_level === 0 && ctx.laundry === 0;
  },
  waterNotEmpty: (ctx: Context, _: EventObject) => {
    return ctx.water_level > 1;
  },
  waterEmptyAndLaundryNotEmpty: (ctx: Context, _: EventObject) => {
    return ctx.water_level === 1 && ctx.laundry !== 0;
  },
  laundryLeftOnly: (ctx: Context, _: EventObject) => {
    return (
      ctx.water_level === 0 &&
      ctx.laundry_soap === "" &&
      ctx.timer === 0 &&
      ctx.laundry !== 0
    );
  },
};
