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
      water_level: (ctx, _) => 1,
    }),
    setTimeToDry: assign({
      timer: (ctx, _) => 5000,
    }),
    draining: assign({
      water_level: (ctx, _) => 0,
      laundry_soap: (ctx, _) => "",
    }),
    drying: assign({
      water_level: (ctx, _) => 0,
    }),
    unloading: assign({
      laundry: (ctx, _) => 0,
    }),
    timerCountdown: assign({
      timer: (ctx) => (ctx.timer -= 1),
    }),
  },
  guards: {
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
    isLaundryLeft: (ctx, _) => {
      return (
        ctx.water_level === 0 && ctx.laundry_soap === "" && ctx.laundry !== 0
      );
    },
    isLaundryEmpty: (ctx, _) => {
      return ctx.laundry === 0;
    },
    isSoapEmpty: (ctx, _) => {
      return ctx.laundry_soap === "";
    },
  },
  services: {
    washingTimer: (ctx) => (send) => {
      timeout = setTimeout(() => {
        send({
          type: "WASHING_TIMEOUT",
        });
      }, ctx.timer);
      return () => {
        clearTimeout(timeout);
      };
    },
    drainingTimer: (ctx) => (send) => {
      timeout = setTimeout(() => {
        send({
          type: "DRAINING_TIMEOUT",
        });
      }, ctx.timer);
      return () => {
        clearTimeout(timeout);
      };
    },
    dryingTimer: (ctx) => (send) => {
      timeout = setTimeout(() => {
        send({
          type: "DRYING_TIMEOUT",
        });
      }, ctx.timer);
      return () => {
        clearTimeout(timeout);
      };
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
