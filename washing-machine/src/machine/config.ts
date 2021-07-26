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
      timer: 3,
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
              src: "ticker",
            },
            on: {
              TICK: {
                actions: ["timerCountdown"]
              }
            },
            // on: {
            //   WASHING_TIMEOUT: {
            //     target: "draining",
            //   },
            // },
            always: {
              target: "draining",
              actions: ["setTime"],
              cond: 'isTimeEqualToZero'
            }
          },
          draining: {
            invoke: {
              src: "ticker",
            },
            on: {
              TICK: {
                actions: ["timerCountdown"]
              }
            },
            // on: {
            //   DRAINING_TIMEOUT: {
            //     target: "drying",
            //     actions: ["draining"],
            //   },
            // },
            always: {
              target: "drying",
              actions: ["draining","setTime"],
              cond: 'isTimeEqualToZero'
            }
          },
          drying: {
            invoke: {
              src: "ticker",
            },
            on: {
              TICK: {
                actions: ["timerCountdown"]
              }
            },
            // on: {
            //   DRYING_TIMEOUT: {
            //     target: "#idle",
            //     actions: ["drying"],
            //   },
            // },
            always: {
              target: "#idle",
              actions: ["drying","setTime"],
              cond: 'isTimeEqualToZero'
            }
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
