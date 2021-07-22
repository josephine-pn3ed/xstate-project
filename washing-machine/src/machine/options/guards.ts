
import { WashingContext,WashingEvent } from "../types";
import {  ConditionPredicate } from "xstate";

const guards: Record<any, ConditionPredicate<WashingContext, WashingEvent>>= {
  laundryNotEmptyAndWaterEmpty: (ctx) => {
    return ctx.laundry !== 0 && ctx.water_level <= 1;
  },
  laundryAndSoapEmpty: (ctx, _) => {
    console.log("hhhhhhhhhhh", ctx.laundry === 0 && ctx.laundry_soap === "");
    
    return ctx.laundry === 0 && ctx.laundry_soap === "";
  },
  laundryNotEmptyAndWaterAndSoapEmpty: (ctx, _) => {
    return ctx.laundry !== 0 && ctx.water_level <= 1 && ctx.laundry_soap === "";
  },
  waterAndLaundryEmpty: (ctx, _) => {
    return ctx.water_level === 0 && ctx.laundry === 0;
  },
  waterNotEmpty: (ctx, _) => {
    return ctx.water_level > 1;
  },
  waterEmptyAndLaundryNotEmpty: (ctx, _) => {
    return ctx.water_level === 1 && ctx.laundry !== 0;
  },
  laundryLeftOnly: (ctx, _) => {
    return (
      ctx.water_level === 0 &&
      ctx.laundry_soap === "" &&
      ctx.timer === 0 &&
      ctx.laundry !== 0
    );
  },
};

export default guards
