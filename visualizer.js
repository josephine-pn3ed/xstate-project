const options = {
  actions: {
    loadWater: assign({
      water_level: (ctx, _) => 8,
    }),
    loadSoap: assign({
      laundry_soap: (ctx, _) => "Calla",
    }),
    loadLaundry: assign({
      laundry: (ctx, _) => 10,
    }),
    setTimeToWash: assign({
      timer: (ctx, _) => 5000,
    }),
    emptyWaterLvl: assign({
      water_level: (ctx, _) => 0,
    }),
    setTimeToDry: assign({
      timer: (ctx, _) => 3000,
    }),
    setTimeToZero: assign({
      timer: (ctx, _) => 0,
    }),
    cancelWashing: assign({
      timer: (ctx, _) => ctx.timer / 2,
    }),
    draining: assign({
      water_level: (ctx, _) => 1,
      laundry_soap: (ctx, _) => "",
    }),
    cancelDraining: assign({
      water_level: (ctx, _) => ctx.water_level / 2,
      timer: (ctx, _) => ctx.timer / 2,
    }),
    drying: assign({
      water_level: (ctx, _) => 0,
    }),
    cancelDrying: assign({
      timer: (ctx, _) => ctx.timer / 2,
    }),
    unloading: assign({
      laundry: (ctx, _) => 0,
    }),
  },
  guards: {
    isLaundryNotEmptyAndWaterEmpty: (ctx) => {
      return ctx.laundry !== 0 && ctx.water_level <= 1;
    },
    isLaundryAndSoapEmpty: (ctx, _) => {
      console.log(
        "Laundry&SoapEmpty",
        ctx.laundry === 0 && ctx.laundry_soap === ""
      );
      return ctx.laundry === 0 && ctx.laundry_soap === "";
    },
    isLaundryNotEmptyAndWaterAndSoapEmpty: (ctx, _) => {
      return (
        ctx.laundry !== 0 && ctx.water_level <= 1 && ctx.laundry_soap === ""
      );
    },
    isWaterEmpty: (ctx, _) => {
      return ctx.water_level === 0;
    },
    isWaterNotEmpty: (ctx, _) => {
      return ctx.water_level > 1;
    },
    isThereWaterAndLaundry: (ctx, _) => {
      return ctx.water_level > 0 && ctx.laundry > 0;
    },
    isWaterEmptyAndLaundryNotEmpty: (ctx, _) => {
      return ctx.water_level <= 0 && ctx.laundry !== 0;
    },
    isLaundryLeftOnly: (ctx, _) => {
      return ctx.water_level < 1 && ctx.laundry_soap === "" && ctx.laundry < 0;
    },
  },
  services: {
    washingTimer: (ctx, event) => (send) => {
      setTimeout(() => {
        send({
          type: "WashingTimeout",
        });
      }, 5000);
    },
    drainingTimer: (ctx, event) => (send) => {
      setTimeout(() => {
        send({
          type: "DrainingTimeout",
        });
      }, 5000);
    },
    dryingTimer: (ctx, event) => (send) => {
      setTimeout(() => {
        send({
          type: "DryingTimeout",
        });
      }, 5000);
    },
  },
};

const fetchMachine = Machine(
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
            cond: "isThereWaterAndLaundry",
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
