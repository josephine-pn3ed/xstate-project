import { WashingContext, WashingEvent } from "../types";
import { MachineOptions } from "xstate";
import actions from "./actions";
import services from "./services";
import guards from "./guards";

const options: MachineOptions<WashingContext, WashingEvent> = {
  actions,
  guards,
  activities: {},
  delays: {},
  services,
};

export default options;
