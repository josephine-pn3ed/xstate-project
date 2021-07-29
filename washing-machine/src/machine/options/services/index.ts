import { ServiceConfig } from 'xstate'
import { IWashingContext, IWashingEvent } from '../../types'

import callbacks from './callbacks'
const services: Record<any, ServiceConfig<IWashingContext, IWashingEvent>> = {
  ...callbacks
}

export default services
