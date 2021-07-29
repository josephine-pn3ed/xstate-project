import { MachineConfig } from "xstate";
import { IWashingEvent, IWashingContext, IMachineSchema } from "./types";

export const config: MachineConfig<
  IWashingContext,
  IMachineSchema,
  IWashingEvent
> = {
  id: "washing_machine_dryer",
  initial: "idle",
  invoke: {
    id: "ticker",
    src: "ticker",
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
          actions: ["loadSoap"],
          target: "idle",
        },
        AUTOMATIC: {
          cond: "isThereWaterAndLaundryAndSoap",
          target: "automatic",
        },
        WASH: {
          cond: "isThereWaterAndLaundry",
          actions: ["setTimeToWash"],
          target: "washing",
        },
        DRAIN: {
          cond: "isWaterNotEmpty",
          actions: ["setTimeToDrain"],
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
          target: "idle",
        },
      },
    },
    automatic: {
      id: "automatic",
      initial: 'auto_washing',
      states: {
        auto_washing: {
          entry: ["setTimeToWash"],
          on: {
            TICK: [
              {
                cond: "hasReachTimeout",
                target: "auto_draining",
              },
              {
                actions: ["decrementTime"],
              },
            ],
          },
        },
        auto_draining: {
          entry: ["setTimeToDrain"],
          on: {
            TICK: [
              {
                cond: "hasReachTimeout",
                actions: ["draining"],
                target: "auto_drying"
              },
              {
                actions: ["decrementTime"],
              },
            ],
          },
        },
        auto_drying: {
          entry: ["setTimeToDry"],
          on: {
            TICK: [
              {
                cond: "hasReachTimeoutAndAutomaticCounterNotZero",
                actions: ["drying", "decrementAutomaticCounter", "loadWater"],
                target: "auto_load_water"
              },
              {
                cond: "hasReachTimeoutAndAutomaticCounterZero",
                actions: ["drying"],
                target: "#idle"
              },
              {
                actions: ["decrementTime"],
              },
            ],
          },
        },
        auto_load_water: {
          entry: ["setTimeToLoadWater"],
          on: {
            TICK:[
              {
                cond: "hasReachTimeout",
                actions: ["loadWater"],
                target: "auto_washing"
              },
              {
                actions: ["decrementTime"],
              }
            ]
          }
        }
      },
    },
    washing: {
      id: "washing",
      on: {
        TICK: [
          {
            cond: "hasReachTimeout",
            target: "#idle",
          },
          {
            actions: ["decrementTime"],
          },
        ],
      },
    },
    draining: {
      id: "draining",
      on: {
        TICK: [
          {
            cond: "hasReachTimeoutAndLaundryIsNotEmpty",
            target: "#idle",
            actions: ["draining"]
          },
          {
            cond: "hasReachTimeoutAndLaundryIsEmpty",
            target: "#idle",
            actions: ["drainWaterAndLaundrySoap"]
          },
          {
            actions: ["decrementTime"],
          }
        ],
      },
    },
    drying: {
      id: "drying",
      on: {
        TICK: [
          {
            cond: "hasReachTimeout",
            target: "#idle",
            actions: ["drying"]
          },
          {
            actions: ["decrementTime"],
          },
        ],
      },
    },
  },
};

export default config;
