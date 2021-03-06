import {
  StateNodeDefinition,
  AnyEventObject,
  AnyStateNodeDefinition
} from 'xstate'

export interface IWashingContext {
  water_level: number
  laundry: number
  laundry_soap: string
  timer: number
  automatic_counter: number
}

export interface ILoadWaterEvent extends AnyEventObject {
  type: 'LOAD_WATER'
}
export interface ILoadSoapEvent extends AnyEventObject {
  type: 'LOAD_SOAP'
}
export interface ILoadLaundryEvent extends AnyEventObject {
  type: 'LOAD_LAUNDRY'
}
export interface IDrainEvent extends AnyEventObject {
  type: 'DRAIN'
}
export interface IDryEvent extends AnyEventObject {
  type: 'DRY'
}
export interface IAutomaticEvent extends AnyEventObject {
  type: 'AUTOMATIC'
}
export interface IUnloadEvent extends AnyEventObject {
  type: 'UNLOAD'
}
export interface IWashEvent extends AnyEventObject {
  type: 'WASH'
}
export interface IDoneEvent extends AnyEventObject {
  type: 'DONE'
}
export interface ICancelEvent extends AnyEventObject {
  type: 'CANCEL'
}
export interface ITickEvent extends AnyEventObject {
  type: 'TICK'
}
export type IWashingEvent =
  | IAutomaticEvent
  | ILoadWaterEvent
  | ILoadSoapEvent
  | ILoadLaundryEvent
  | IDrainEvent
  | IDryEvent
  | IUnloadEvent
  | IWashEvent
  | IDoneEvent
  | ICancelEvent
  | ITickEvent

export interface IAutomaticSchema extends AnyStateNodeDefinition {
  states: {
    auto_washing: StateNodeDefinition<IWashingContext, any, any>
    auto_draining: StateNodeDefinition<IWashingContext, any, any>
    auto_drying: StateNodeDefinition<IWashingContext, any, any>
    auto_load_water: StateNodeDefinition<IWashingContext, any, any>
  }
}

export interface IMachineSchema extends AnyStateNodeDefinition {
  states: {
    idle: StateNodeDefinition<IWashingContext, any, any>
    automatic: StateNodeDefinition<IWashingContext, IAutomaticSchema, any>
    washing: StateNodeDefinition<IWashingContext, any, any>
    draining: StateNodeDefinition<IWashingContext, any, any>
    drying: StateNodeDefinition<IWashingContext, any, any>
  }
}
