export type WashingEvent =
  | { type: "LOAD_WATER" }
  | { type: "LOAD_LAUNDRY" }
  | { type: "LOAD_SOAP" }
  | { type: "AUTOMATIC" }
  | { type: "DRAIN" }
  | { type: "DRY" }
  | { type: "UNLOAD" }
  | { type: "WASH" }
  | { type: "DONE" }
  | { type: "CANCEL" }
  | { type: "WASHING_TIMEOUT" }
  | { type: "DRAINING_TIMEOUT" }
  | { type: "DRYING_TIMEOUT" }
  | { type: "AUTOMATIC" };

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
  | { value: "unloading"; context: WashingContext }
  | { value: "done"; context: WashingContext }
  | { value: "automatic"; context: WashingContext };
