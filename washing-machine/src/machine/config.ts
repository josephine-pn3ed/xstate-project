import { createMachine } from "xstate";
import options from "./options";
// import {actions} from "./options/actions"
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
        entry: [(ctx) => console.log("IDOLLL", ctx)],
        on: {
          LOAD_WATER_AND_LAUNDRY: {
            target: "loading",
            actions: ["loadWaterAndLaundry"],
            cond: "waterAndLaundryEmpty",
          },
          LOAD_WATER_LAUNDRY_AND_SOAP: {
            cond: "laundryAndSoapEmpty",
            actions: [
              "loadWaterLaundryAndSoap",
              () => {
                console.log("******************");
              },
            ],
            target: "loading",
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
        entry: [(ctx) => console.log("CONTEXTTTtt", ctx)],
        on: {
          WASH: {
            target: "washing",
            actions: ["setTimeToWash"],
          },
        },
        exit: (ctx, _) => console.log(ctx, "Loading item here"),
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
            actions: ["draining"],
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
