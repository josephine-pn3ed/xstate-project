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
          LOAD_WATER: {
            cond: "isWaterEmpty",
            actions: ["loadWater"],
            target: "idle",
          },
          LOAD_LAUNDRY: {
            cond: "isLaundryEmpty",
            actions: ["loadLaundry"],
            target: "idle",
          },
          LOAD_SOAP: {
            cond: "isSoapEmpty",
            target: "idle",
            actions: ["loadSoap"],
          },
          WASH: {
            cond: "isThereWaterAndLaundry",
            actions: ["setTimeToWash"],
            target: "washing",
          },
          DRAIN: {
            cond: "isWaterNotEmpty",
            actions: ["emptyWaterLvl"],
            target: "draining",
          },
          DRY: {
            cond: "isWaterEmptyAndLaundryNotEmpty",
            actions: ["setTimeToDry"],
            target: "drying",
          },
          UNLOAD: {
            cond: "isLaundryLeft",
            actions:["unloading"],
            target: "unloading",
          },
        },
      },
      washing: {
        invoke: {
          src: "washingTimer",
        },
        on: {
          WashingTimeout: {
            target: "idle",
            actions: ["setTimeToZero"]
          },
        },
      },
      draining: {
        invoke: {
          src: "drainingTimer",
        },
        on: {
          DrainingTimeout: {
            target: "idle",
            actions: ["draining", "setTimeToZero"],
          },
        },
      },
      drying: {
        invoke: {
          src: "dryingTimer",
        },
        on: {
          DryingTimeout: {
            target: "idle",
            actions: ["drying", "setTimeToZero"],
          },
        },
      },
      // waiting: {
      //   initial: "check_powder",
      //   states: {
      //     check_powder: {
      //       after: {
      //         1000: "check_water"
      //       }
      //     },
      //     check_water: {
      //       after: {
      //         2000: "washing"
      //       }
      //     }
      //   }
      // },
      unloading: {
        on: {
          DONE: {
            target: "done",
            actions: ["unloading"],
          },
        },
      },
      done:{
        type:"final"
      }
    },
  },
  options
);

export default washingMachineDryer;
