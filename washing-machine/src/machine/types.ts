export type WashingEvent =
  | { type: "LOAD_WATER_AND_LAUNDRY" }
  | { type: "LOAD_WATER_LAUNDRY_AND_SOAP" }
  | { type: "LOAD_WATER_ONLY" }
  | { type: "LOAD_WATER_AND_SOAP" }
  | { type: "DRAIN" }
  | { type: "DRY" }
  | { type: "UNLOAD" }
  | { type: "WASH" }
  | { type: "DONE" }
  | { type: "CANCEL" }
  | { type: "WashingTimeout" }
  | { type: "DrainingTimeout" }
  | { type: "DryingTimeout" };

export interface WashingContext {
  water_level: number;
  laundry: number;
  laundry_soap: string;
  timer: number;
}

export type WashingState =
  | { value: "idle"; context: WashingContext }
  | { value: "loading"; context: WashingContext }
  | { value: "washing"; context: WashingContext }
  | { value: "draining"; context: WashingContext }
  | { value: "drying"; context: WashingContext }
  | { value: "unloading"; context: WashingContext };
