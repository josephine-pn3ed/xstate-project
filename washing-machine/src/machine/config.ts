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
          target: "idle",
          actions: ["loadSoap"],
        },
        AUTOMATIC: {
          cond: "isThereWaterAndLaundry",
          target: "automatic",
        },
        WASH: {
          cond: "isThereWaterAndLaundry",
          actions: ["setTimeToWash"],
          target: "washing",
        },
        DRAIN: {
          cond: "isWaterNotEmpty",
          actions: ["emptyWaterLvl", "setTimeToDrain"],
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
      id: "automatic",
      initial:'auto_washing',
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
                  target: "auto_drying",
                },
                {
                  actions: ["draining","decrementTime"],
                },
              ],
            },
          },
          auto_drying: {
            entry: ["setTimeToDry"],
            on: {
              TICK: [
                {
                  cond: "hasReachTimeout",
                  target: "#idle",
                },
                {
                  actions: ["drying","decrementTime"],
                },
              ],
            },
          },
      },
    },
    washing: {
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
      id:"draining",
      on: {
        TICK: [
          {
            cond: "hasReachTimeout",
            target: "#idle",
          },
          {
            actions: ["draining","decrementTime"],
          },
        ],
      },
    },
    drying: {
      id:"drying",
      on: {
        TICK: [
          {
            cond: "hasReachTimeout",
            target: "#idle",
          },
          {
            actions: ["drying","decrementTime"],
          },
        ],
      },
    },
  },
};

export default config;
