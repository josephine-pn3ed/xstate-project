import { StateNodeConfig } from "xstate";

export interface IWashingContext {
  water_level: number;
  laundry: number;
  laundry_soap: string;
  timer: number;
  convert_timer:number;
}


export type IWashingEvent =
  |IAutomatic
  |ILoadWater
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

  export interface ILoadWater{
    type:"LOAD_WATER"
  }
  export interface ILoadSoap{
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
  export interface IAutomatic{
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
export interface IAutomatic{
  states:{
    auto_washing: StateNodeConfig<IWashingContext , any , any >,
    auto_draining: StateNodeConfig<IWashingContext , any , any >,
    auto_drying: StateNodeConfig<IWashingContext , any , any >,
  }
}

export interface ISchema {
  states: {
    idle: StateNodeConfig<IWashingContext , any , any >,
    automatic: StateNodeConfig<IWashingContext , IAutomatic , any >,
    washing: StateNodeConfig<IWashingContext , any , any >,
    draining: StateNodeConfig<IWashingContext , any , any >,
    drying: StateNodeConfig<IWashingContext , any , any >,
  }
}  
