import { createMachine } from "xstate";
import options from "./options";

const washingMachineDryer = createMachine(
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
            LOAD_WATER_ONLY: {
              target: "loading",
              actions: ["waterOnly"],
              cond: "laundryAndLaundrySoapNotEmpty",
            },
            LOAD_WATER_LAUNDRY_AND_LAUNDRY_SOAP: {
              target: "loading",
              actions: ["waterLaundryAndLaundrySoap"],
              cond: "laundryAndLaundrySoapEmpty",
            },
            DRAIN: {
              target: "draining",
              cond: "loadedContext",
            },
            DRY: {
              
            },
            UNLOAD: {
              
            }
        },
      },
      loading: {
        entry: "loadContext",
        on: {
          WASH: "washing",
          CANCEL: "idle",
        },
      },
      washing: {
        entry: (context, event) => console.log(context),
        on: {
          DONE: "idle",
          CANCEL: "idle",
        },
      },
      draining: {
        entry: "removeLaundrySoap",
        on: {
          DONE: "idle",
          CANCEL: "idle",
        },
      },
      drying: {
        on: {
          DONE: "idle",
          CANCEL: "idle",
        },
      },
      unloading: {
        on: {
          DONE: "idle",
        },
      },
    },
  },
  options
);

export default washingMachineDryer;