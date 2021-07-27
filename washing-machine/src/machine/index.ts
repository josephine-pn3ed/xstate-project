import { config } from './config'
import { options } from './options'
import { createMachine } from "xstate";
import { IWashingContext } from './types';


// context: {
//     water_level: 0,
//     laundry: 0,
//     laundry_soap: "",
//     timer: 0,
//     convert_timer:0
//   },
const default_context:IWashingContext = {
    water_level: 0,
    laundry: 0,
    laundry_soap: "",
    timer: 0,
    convert_timer:0
}


export const spawnMachine = (context:Partial<IWashingContext>) => {
    const machine_config = {
        ...config ,
        context:{
            ...default_context,
            ...context
        }
    }
    return createMachine( machine_config , options)
}