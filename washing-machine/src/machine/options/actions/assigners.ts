import { IWashingContext, IWashingEvent } from '../../types'
import { assign, ActionFunctionMap } from 'xstate'

const actions: ActionFunctionMap<IWashingContext, IWashingEvent> = {
  loadWater: assign({
    // eslint-disable-next-line
    water_level: _ => 8
  }),
  loadSoap: assign({
    // eslint-disable-next-line
    laundry_soap: _ => 'Calla'
  }),
  loadLaundry: assign({
    // eslint-disable-next-line
    laundry: _ => 10
  }),
  setTimeToWash: assign({
    // eslint-disable-next-line
    timer: _ => 10
  }),
  setTimeToDry: assign({
    // eslint-disable-next-line
    timer: _ => 5
  }),
  setTimeToDrain: assign({
    // eslint-disable-next-line
    timer: _ => 5
  }),
  setTimeToLoadWater: assign({
    // eslint-disable-next-line
    timer: _ => 3
  }),
  emptyWaterLvl: assign({
    // eslint-disable-next-line
    water_level: _ => 1
  }),
  draining: assign({
    // eslint-disable-next-line
    laundry_soap: _ => '',
    // eslint-disable-next-line
    water_level: _ => 1
  }),
  drainWaterAndLaundrySoap: assign({
    // eslint-disable-next-line
    laundry_soap: _ => '',
    // eslint-disable-next-line
    water_level: _ => 0
  }),
  drying: assign({
    // eslint-disable-next-line
    water_level: _ => 0
  }),
  unloading: assign({
    // eslint-disable-next-line
    laundry: _ => 0,
    // eslint-disable-next-line
    automatic_counter: _ => 3
  }),
  setTime: assign({
    // eslint-disable-next-line
    timer: _ => 3
  }),
  decrementTime: assign({
    timer: ctx => ctx.timer - 1
  }),
  decrementAutomaticCounter: assign({
    automatic_counter: ctx => ctx.automatic_counter - 1
  })
}
export default actions
