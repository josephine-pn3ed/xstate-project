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
            // target: "loading",
            actions: ["loadWater"],
            cond: "isWaterEmpty",
          },
          LOAD_LAUNDRY: {
            // cond: "isLaundryAndSoapEmpty",
            actions: ["loadLaundry"],
            target: "idle",
          },
          LOAD_SOAP: {
            // target: "loading",
            actions: ["loadSoap"],
            // cond: "isLaundryNotEmptyAndWaterAndSoapEmpty",
          },
          WASH: {
            target: "washing",
            actions: ["setTimeToWash"],
            cond: "isThereWaterAndLaundry"
          },
          DRAIN: {
            target: "draining",
            actions: ["emptyWaterLvl"],
            cond: "isWaterNotEmpty",
          },
          DRY: {
            target: "drying",
            actions: ["setTimeToDry"],
            // cond: "isWaterEmptyAndLaundryNotEmpty",
          },
          UNLOAD: {
            target: "unloading",
            // cond: "isLaundryLeftOnly",
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
            // actions: ["draining"],
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
            actions: ["drying"],
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
