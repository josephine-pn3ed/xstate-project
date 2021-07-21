import { interpret } from "xstate";
import washingMachineDryer from './machine/config';

const  washingService = interpret(washingMachineDryer).onTransition((states) => {

  console.log(states.value, states.context);

})

washingService.start();
washingService.send(["LOAD_WATER_LAUNDRY_AND_SOAP", "WASH"]);
