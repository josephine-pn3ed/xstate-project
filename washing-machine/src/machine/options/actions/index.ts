import { WashingContext, WashingEvent } from "../../types";
import { ActionFunctionMap } from "xstate";
import assigners from "./assigners";

const actions: ActionFunctionMap<WashingContext, WashingEvent> = {
  ...assigners,
};

export default actions;
