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
      timer: (ctx, _) => 10,
    }),
    setTimeToDry: assign({
      timer: (ctx, _) => 5,
    }),

    setTimeToDrain: assign({
      timer: (ctx, _) => 5,
    }),
    emptyWaterLvl: assign({
      water_level: (ctx, _) => 1,
    }),
    draining: assign({
      water_level: (ctx, _) => 1,
      laundry_soap: (ctx, _) => "",
    }),
    drying: assign({
      water_level: (ctx, _) => 0,
    }),
    unloading: assign({
      laundry: (ctx, _) => 0,
    }),
    setTime: assign({
      timer: (ctx) => 3,
    }),
    decrementTime: assign({
      timer: (ctx) => ctx.timer - 1,
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
      timer: 5000,
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
                },
                {
                  actions: ["draining", "decrementTime"],
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
                  actions: ["drying", "decrementTime"],
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
        id: "draining",
        on: {
          TICK: [
            {
              cond: "hasReachTimeout",
              target: "#idle",
            },
            {
              actions: ["draining", "decrementTime"],
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
            },
            {
              actions: ["drying", "decrementTime"],
            },
          ],
        },
      },
    },
  },
  options
);
