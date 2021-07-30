import { ServiceConfig } from 'xstate'
import { IWashingContext, IWashingEvent } from '../../types'
import callbacks from './callbacks'

const services: Record<string | number | symbol, ServiceConfig<IWashingContext, IWashingEvent>> = {
  ...callbacks
}

export default services
