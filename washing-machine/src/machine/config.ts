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
      timer: 5000,
    },
    states: {
      idle: {
        id: "idle",
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
          AUTOMATIC: {
            target: "automatic",
            cond: "isThereWaterAndLaundry",
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
            actions: ["unloading"],
            target: "#idle",
          },
        },
      },
      automatic: {
        initial: "washing",
        states: {
          washing: {
            invoke: {
              src: "washingTimer",
            },
            on: {
              WASHING_TIMEOUT: {
                target: "draining",
              },
            },
          },
          draining: {
            invoke: {
              src: "drainingTimer",
            },
            on: {
              DRAINING_TIMEOUT: {
                target: "drying",
                actions: ["draining"],
              },
            },
          },
          drying: {
            invoke: {
              src: "dryingTimer",
            },
            on: {
              DRYING_TIMEOUT: {
                target: "#idle",
                actions: ["drying"],
              },
            },
          },
        },
      },
      washing: {
        invoke: {
          src: "washingTimer",
        },
        on: {
          WASHING_TIMEOUT: {
            target: "#idle",
          },
        },
      },
      draining: {
        invoke: {
          src: "drainingTimer",
        },
        on: {
          DRAINING_TIMEOUT: {
            target: "#idle",
            actions: ["draining"],
          },
        },
      },
      drying: {
        invoke: {
          src: "dryingTimer",
        },
        on: {
          DRYING_TIMEOUT: {
            target: "#idle",
            actions: ["drying"],
          },
        },
      },
    },
  },
  options
);

export default washingMachineDryer;
