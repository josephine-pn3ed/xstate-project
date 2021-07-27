import { IWashingContext, IWashingEvent } from "../types";
import { ConditionPredicate } from "xstate";

const guards: Record<any, ConditionPredicate<IWashingContext, IWashingEvent>> = {
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
    return ctx.water_level === 1 && ctx.laundry !== 0;
  },
  isLaundryLeft: (ctx, _) => {
    return (
      ctx.water_level === 0 && ctx.laundry_soap === "" && ctx.laundry !== 0
    );
  },
  isLaundryEmpty: (ctx, _) => {
    return ctx.laundry === 0;
  },
  isSoapEmpty: (ctx, _) => {
    return ctx.laundry_soap === "";
  },
  hasReachTimeout: (ctx) => ctx.timer <= 0
};

export default guards;
