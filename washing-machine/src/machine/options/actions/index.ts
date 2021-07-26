import { IWashingContext, IWashingEvent } from "../../types";
import { ActionFunctionMap } from "xstate";
import assigners from "./assigners";

const actions: ActionFunctionMap<IWashingContext, IWashingEvent> = {
  ...assigners,
};

export default actions;
