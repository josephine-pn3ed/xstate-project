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
      entry: [],
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
          actions: ["setTimeToWash", "setTimeToDrain", "setTimeToDry"],
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
      // ! TODO Tom
      // @ts-ignore
      // initial:"auto_washing",
      states: {
        //   auto_washing: {
        //     invoke: {
        //       src: "washingTimer",
        //     },
        //     on: {
        //       WASHING_TIMEOUT: {
        //         target: "draining",
        //         // actions: ["setTimeToZero"]
        //       },
        //     },
        //   },
        //   auto_draining: {
        //     invoke: {
        //       src: "drainingTimer",
        //     },
        //     on: {
        //       DRAINING_TIMEOUT: {
        //         target: "drying",
        //         actions: ["draining"], //"setTimeToZero"
        //       },
        //     },
        //   },
        //   auto_drying: {
        //     invoke: {
        //       src: "dryingTimer",
        //     },
        //     on: {
        //       DRYING_TIMEOUT: {
        //         target: "#idle",
        //         actions: ["drying"], //"setTimeToZero"
        //       },
        //     },
        //   },
      },
    },
    washing: {
      on: {
        WASHING_TIMEOUT: {
          actions: ["timerCountdown"],
          target: "#idle",
        },
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
      on: {
        DRAINING_TIMEOUT: {
          actions: ["draining", "timerCountdown"],
          target: "#idle",
        },
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
    drying: {
      on: {
        DRYING_TIMEOUT: {
          actions: ["drying", "timerCountdown"],
          target: "#idle",
        },
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
  },
};

export default config;
