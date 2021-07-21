import { createMachine } from "xstate";
import options from "./options";
import { WashingEvent, WashingContext, WashingState } from "./types";

const washingMachineDryer = createMachine<
  WashingContext,
  WashingEvent,
  WashingState
>(
  {
    id: "washing_machine_dryer",
    initial: "idle",
    context: {
      water_level: 0,
      laundry: 0,
      laundry_soap: "",
      timer: 0,
    },
    states: {
      idle: {
        on: {
          LOAD_WATER_AND_LAUNDRY: {
            target: "loading",
            actions: ["loadWaterAndLaundry"],
            cond: "waterAndLaundryEmpty",
          },
          LOAD_WATER_LAUNDRY_AND_SOAP: {
            target: "loading",
            actions: ["loadWaterLaundryAndSoap"],
            cond: "laundryAndSoapEmpty",
          },
          LOAD_WATER_ONLY: {
            target: "loading",
            actions: ["loadWaterOnly"],
            cond: "laundryNotEmptyAndWaterEmpty",
          },
          LOAD_WATER_AND_SOAP: {
            target: "loading",
            actions: ["loadWaterAndSoap"],
            cond: "laundryNotEmptyAndWaterAndSoapEmpty",
          },
          DRAIN: {
            target: "draining",
            actions: ["setTimeToDrain"],
            cond: "waterNotEmpty",
          },
          DRY: {
            target: "drying",
            actions: ["setTimeToDry"],
            cond: "waterEmptyAndLaundryNotEmpty",
          },
          UNLOAD: {
            target: "unloading",
            cond: "laundryLeftOnly",
          },
        },
        exit: (ctx, _) => console.log(ctx, "Assigning item here"),
      },
      loading: {
        on: {
          WASH: {
            target: "washing",
            actions: ["setTimeToWash"],
          },
        },
      },
      washing: {
        on: {
          CANCEL: {
            target: "idle",
            actions: ["cancelWashing"],
          },
        },
        after: [
          {
            delay: 3000,
            target: "idle",
            actions: ["setTimeToZero"],
          },
        ],
      },
      draining: {
        on: {
          CANCEL: {
            target: "idle",
            actions: ["cancelDraining"],
          },
        },
        after: [
          {
            delay: 4000,
            target: "idle",
            actions: ["draining", "setTimeToZero"],
          },
        ],
      },
      drying: {
        on: {
          CANCEL: {
            target: "idle",
            actions: ["cancelDrying"],
          },
        },
        after: [
          {
            delay: 3000,
            target: "idle",
            actions: ["drying", "setTimeToZero"],
          },
        ],
      },
      unloading: {
        on: {
          DONE: {
            target: "idle",
            actions: ["unloading"],
          },
        },
      },
    },
  },
  options
);

export default washingMachineDryer;
