import { IWashingContext, IWashingEvent } from '../types'
import { ConditionPredicate } from 'xstate'

// eslint-disable-next-line
const guards: Record<
  string | number | symbol,
  ConditionPredicate<IWashingContext, IWashingEvent>
> = {
  isWaterEmpty: ctx => ctx.water_level <= 1,
  isWaterNotEmpty: ctx => ctx.water_level > 1,
  isThereWaterAndLaundryAndSoap: ctx =>
    ctx.water_level > 0 && ctx.laundry > 0 && ctx.laundry_soap !== '',
  isThereWaterAndLaundry: ctx => ctx.water_level > 0 && ctx.laundry > 0,
  isWaterEmptyAndLaundryNotEmpty: ctx =>
    ctx.water_level === 1 && ctx.laundry !== 0,
  isLaundryLeft: ctx =>
    ctx.water_level === 0 && ctx.laundry_soap === '' && ctx.laundry !== 0,
  isLaundryEmpty: ctx => ctx.laundry === 0,
  isSoapEmpty: ctx => ctx.laundry_soap === '',
  isTimerEqualOne: ctx => ctx.timer === 1,
  hasReachTimeout: ctx => ctx.timer <= 0,
  hasReachTimeoutAndLaundryIsNotEmpty: ctx => ctx.timer <= 0 && !!ctx.laundry,
  hasReachTimeoutAndLaundryIsEmpty: ctx => ctx.timer <= 0 && !ctx.laundry,
  hasReachTimeoutAndAutomaticCounterNotZero: ctx =>
    ctx.timer <= 0 && ctx.automatic_counter > 1,
  hasReachTimeoutAndAutomaticCounterZero: ctx =>
    ctx.timer <= 0 && ctx.automatic_counter <= 1
}

export default guards
