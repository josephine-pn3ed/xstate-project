import { ServiceConfig } from 'xstate'
import { IWashingContext, IWashingEvent } from '../../types'

const services: Record<any, ServiceConfig<IWashingContext, IWashingEvent>> = {
  ticker: () => send => {
    const sendTick = () => {
      send({
        type: 'TICK'
      })
    }
    const ticker = setInterval(sendTick, 1000)
    const stopTicker = () => {
      clearInterval(ticker)
    }
    return stopTicker
  }
}

export default services
