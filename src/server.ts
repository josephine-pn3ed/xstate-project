import { interpret } from "xstate";
import washingMachineDryer from './machine/config';

const  washingService = interpret(washingMachineDryer).onTransition((states) => {

  console.log(states.value, states.context);

})

washingService.start();
washingService.send({ type: "LOAD" });
washingService.send({ type: "TO_WASH" });
washingService.send({ type: "DONE" });
