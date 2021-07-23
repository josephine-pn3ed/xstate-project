import { MachineOptions } from "xstate";
import { WashingContext, WashingEvent } from "../types";

import actions from "./actions";
// import activities from "./activities";
// import delays from "./delays";
import guards from "./guards";
import services from "./services";

const options: MachineOptions<WashingContext, WashingEvent> = {
  actions,
  activities:{},
  delays:{},
  guards,
  services,
};
export default options