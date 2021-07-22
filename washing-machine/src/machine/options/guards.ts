import { WashingContext, WashingEvent } from "../types";
import { ConditionPredicate } from "xstate";

const guards: Record<any, ConditionPredicate<WashingContext, WashingEvent>> = {
  isLaundryNotEmptyAndWaterEmpty: (ctx) => {
    return ctx.laundry !== 0 && ctx.water_level <= 1;
  },
  isLaundryAndSoapEmpty: (ctx, _) => {
    console.log(
      "Laundry&SoapEmpty",
      ctx.laundry === 0 && ctx.laundry_soap === ""
    );
    return ctx.laundry === 0 && ctx.laundry_soap === "";
  },
  isLaundryNotEmptyAndWaterAndSoapEmpty: (ctx, _) => {
    return ctx.laundry !== 0 && ctx.water_level <= 1 && ctx.laundry_soap === "";
  },
  isWaterEmpty: (ctx, _) => {
    return ctx.water_level === 0;
  },
  isWaterNotEmpty: (ctx, _) => {
    return ctx.water_level > 1;
  },
  isThereWaterAndLaundry: (ctx, _) => {
    return ctx.water_level > 0 && ctx.laundry > 0;
  },
  isWaterEmptyAndLaundryNotEmpty: (ctx, _) => {
    return ctx.water_level <= 0 && ctx.laundry !== 0;
  },
  isLaundryLeftOnly: (ctx, _) => {
    return ctx.water_level < 1 && ctx.laundry_soap === "" && ctx.laundry < 0;
  },
};

export default guards;
