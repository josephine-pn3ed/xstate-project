import { interpret } from "xstate";
import washingMachineDryer from "./machine/config";

const washingService = interpret(washingMachineDryer).onTransition((states) => {
  console.log(states.value, states.context);
});

washingService.start();
washingService.send({ type: "LOAD_WATER_LAUNDRY_AND_SOAP" });
washingService.send({ type: "WASH" });
washingService.send({ sendId: "after" });
