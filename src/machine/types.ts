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
  | { type: "CANCEL" };

export interface WashingContext {
  water_level: Number;
  laundry: Number;
  laundry_soap: String;
  timer: Number;
}

export type WashingState =
  | { value: "idle"; context: WashingContext }
  | { value: "loading"; context: WashingContext }
  | { value: "washing"; context: WashingContext }
  | { value: "draining"; context: WashingContext }
  | { value: "drying"; context: WashingContext }
  | { value: "unloading"; context: WashingContext };
