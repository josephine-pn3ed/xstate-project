import { MachineOptions } from 'xstate'
import { IWashingContext, IWashingEvent } from '../types'

import actions from './actions'
// import activities from "./activities";
// import delays from "./delays";
import guards from './guards'
import services from './services'

export const options: MachineOptions<IWashingContext, IWashingEvent> = {
  actions,
  activities: {},
  delays: {},
  guards,
  services
}
export default options
