import { StateNodeDefinition, AnyEventObject, AnyStateNodeDefinition } from "xstate";

export interface IWashingContext {
  water_level: number;
  laundry: number;
  laundry_soap: string;
  timer: number;
  convert_timer:number;
}


export type IWashingEvent =
  |IAutomaticEvent
  |ILoadWaterEvent
  |ILoadSoap
  |ILoadLaundry
  |IDrain
  |IDry
  |IUnload
  |IWash
  |IDone
  |ICancel
  |IWashingTimeout
  |IDrainingTimeout
  |IDryingTimeout
  |ITick;

  export interface ILoadWaterEvent extends AnyEventObject{
    type:"LOAD_WATER"
  }
  export interface ILoadSoap extends AnyEventObject{
    type:"LOAD_SOAP"
  }
  export interface ILoadLaundry{
    type:"LOAD_LAUNDRY"
  }
  export interface IDrain{
    type:"DRAIN"
  }
  export interface IDry{
    type:"DRY"
  }
  export interface IAutomaticEvent extends AnyEventObject{
    type:"AUTOMATIC"
  }
  export interface IUnload{
    type:"UNLOAD"
  }
  export interface IWash{
    type:"WASH"
  }
  export interface IDone{
    type:"DONE"
  }
  export interface ICancel{
    type:"CANCEL"
  }
  export interface IWashingTimeout{
    type:"WASHING_TIMEOUT"
  }
  export interface IDrainingTimeout{
    type:"DRAINING_TIMEOUT"
  }
  export interface IDryingTimeout{
    type:"DRYING_TIMEOUT"
  }
  export interface ITick{
    type:"TICK"
  }
  
// export type WashingState =
//   | { value: "idle"; context: IWashingContext }
//   | { value: "loading"; context: IWashingContext }
//   | { value: "washing"; context: IWashingContext }
//   | { value: "draining"; context: IWashingContext }
//   | { value: "drying"; context: IWashingContext }
//   | { value: "unloading"; context: IWashingContext }
//   | { value: "done"; context: IWashingContext }
//   | { value: "automatic"; context: IWashingContext };
export interface IAutomaticSchema extends AnyStateNodeDefinition{
  states:{
    auto_washing: StateNodeDefinition<IWashingContext , any , any >,
    auto_draining: StateNodeDefinition<IWashingContext , any , any >,
    auto_drying: StateNodeDefinition<IWashingContext , any , any >,
  }
}

export interface IMachineSchema extends AnyStateNodeDefinition {
  states: {
    idle: StateNodeDefinition<IWashingContext , any , any >,
    automatic: StateNodeDefinition<IWashingContext , IAutomaticSchema , any >,
    washing: StateNodeDefinition<IWashingContext , any , any >,
    draining: StateNodeDefinition<IWashingContext , any , any >,
    drying: StateNodeDefinition<IWashingContext , any , any >,
  }
}  
