import { IWashingContext, IWashingEvent } from '../../types'
import { assign, ActionFunctionMap } from 'xstate'

const actions: ActionFunctionMap<IWashingContext, IWashingEvent> = {
  loadWater: assign({
    water_level: _ => 8
  }),
  loadSoap: assign({
    laundry_soap: _ => 'Calla'
  }),
  loadLaundry: assign({
    laundry: _ => 10
  }),
  setTimeToWash: assign({
    timer: _ => 10
  }),
  setTimeToDry: assign({
    timer: _ => 5
  }),
  setTimeToDrain: assign({
    timer: _ => 5
  }),
  setTimeToLoadWater: assign({
    timer: _ => 3
  }),
  emptyWaterLvl: assign({
    water_level: _ => 1
  }),
  draining: assign({
    laundry_soap: _ => '',
    water_level: _ => 1
  }),
  drainWaterAndLaundrySoap: assign({
    laundry_soap: _ => '',
    water_level: _ => 0
  }),
  drying: assign({
    water_level: _ => 0
  }),
  unloading: assign({
    laundry: _ => 0
  }),
  setTime: assign({
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
