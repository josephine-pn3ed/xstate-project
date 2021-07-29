import { config } from './config'
import { options } from './options'
import { createMachine } from 'xstate'
import { IWashingContext } from './types'

const default_context: IWashingContext = {
  water_level: 0,
  laundry: 0,
  laundry_soap: '',
  timer: 0,
  automatic_counter: 3
}

export const spawnMachine = (context: Partial<IWashingContext>) => {
  const machine_config = {
    ...config,
    context: {
      ...default_context,
      ...context
    }
  }
  return createMachine(machine_config, options)
}
