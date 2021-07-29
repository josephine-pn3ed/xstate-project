const options = {
  actions: {
    loadWater: assign({
      water_level: (_) => 8,
    }),
    loadSoap: assign({
      laundry_soap: (_) => "Calla",
    }),
    loadLaundry: assign({
      laundry: (_) => 10,
    }),
    setTimeToWash: assign({
      timer: (_) => 10,
    }),
    setTimeToDry: assign({
      timer: (_) => 5,
    }),
    setTimeToDrain: assign({
      timer: (_) => 5,
    }),
    setTimeToLoadWater: assign({
      timer: (_) => 3,
    }),
    emptyWaterLvl: assign({
      water_level: (_) => 1,
    }),
    draining: assign({
      laundry_soap: (_) => "",
      water_level: (_) => 1,
    }),
    drainWaterAndLaundrySoap: assign({
      laundry_soap: (_) => "",
      water_level: (_) => 0,
    }),
    drying: assign({
      water_level: (_) => 0,
    }),
    unloading: assign({
      laundry: (_) => 0,
    }),
    setTime: assign({
      timer: (_) => 3,
    }),
    decrementTime: assign({
      timer: (ctx) => ctx.timer - 1,
    }),
    decrementAutomaticCounter: assign({
      automatic_counter: (ctx) => ctx.automatic_counter - 1,
    }),
  },
  guards: {
    isWaterEmpty: (ctx, _) => {
      return ctx.water_level <= 1;
    },
    isWaterNotEmpty: (ctx, _) => {
      return ctx.water_level > 1;
    },
    isThereWaterAndLaundryAndSoap: (ctx, _) => {
      return ctx.water_level > 0 && ctx.laundry > 0 && ctx.laundry_soap !== "";
    },
    isThereWaterAndLaundry: (ctx, _) => {
      return ctx.water_level > 0 && ctx.laundry > 0;
    },
    isWaterEmptyAndLaundryNotEmpty: (ctx, _) => {
      return ctx.water_level === 1 && ctx.laundry !== 0;
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
    hasReachTimeout: (ctx) => ctx.timer <= 0,

    hasReachTimeoutAndLaundryIsNotEmpty: (ctx) => {
      return ctx.timer <= 0 && !!ctx.laundry;
    },
    hasReachTimeoutAndLaundryIsEmpty: (ctx) => {
      return ctx.timer <= 0 && !ctx.laundry;
    },
    hasReachTimeoutAndAutomaticCounterNotZero: (ctx) => {
      return ctx.timer <= 0 && ctx.automatic_counter > 1;
    },
    hasReachTimeoutAndAutomaticCounterZero: (ctx) => {
      return ctx.timer <= 0 && ctx.automatic_counter <= 1;
    },
  },
  services: {
    ticker: (ctx) => (send) => {
      const sendTick = () => {
        send({
          type: "TICK",
        });
      };
      const ticker = setInterval(sendTick, 1000);
      const stopTicker = () => {
        clearInterval(ticker);
      };
      return stopTicker;
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
      automatic_counter: 3,
    },
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
        initial: "auto_washing",
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
                  actions: ["draining"],
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
                  target: "auto_load_water",
                  actions: ["drying", "decrementAutomaticCounter", "loadWater"],
                },
                {
                  cond: "hasReachTimeoutAndAutomaticCounterZero",
                  target: "#idle",
                  actions: ["drying"],
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
              TICK: [
                {
                  cond: "hasReachTimeout",
                  target: "auto_washing",
                  actions: ["loadWater"],
                },
                {
                  actions: ["decrementTime"],
                },
              ],
            },
          },
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
              actions: ["draining"],
            },
            {
              cond: "hasReachTimeoutAndLaundryIsEmpty",
              target: "#idle",
              actions: ["drainWaterAndLaundrySoap"],
            },
            {
              actions: ["decrementTime"],
            },
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
              actions: ["drying"],
            },
            {
              actions: ["decrementTime"],
            },
          ],
        },
      },
    },
  },
  options
);
