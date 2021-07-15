const options = {
  actions: {
    waterOnly: assign({
      water_level: (ctx, evt) => 8,
    }),
    waterLaundryAndLaundrySoap: assign({
      water_level: (ctx, evt) => 8,
      laundry: (ctx, evt) => 10,
      laundry_soap: (ctx, evt) => "Calla",
    }),
    setTimeToWash: assign({
      timer: (ctx, evt) => 5000,
    }),
    setTimeToDrain: assign({
      timer: (ctx, evt) => 4000,
    }),
    setTimeToDry: assign({
      timer: (ctx, evt) => 3000,
    }),
    setTimeToZero: assign({
      timer: (ctx, evt) => 0,
    }),
    draining: assign({
      water_level: (ctx, evt) => 1,
    }),
    drying: assign({
      water_level: (ctx, evt) => 0,
    }),
  },
  guards: {
    laundryAndLaundrySoapNotEmpty: (ctx, evt) => {
      return ctx.laundry !== 0 && ctx.laundry_soap !== "";
    },
    laundryAndLaundrySoapEmpty: (ctx, evt) => {
      return ctx.laundry === 0 && ctx.laundry_soap === "";
    },
    waterEmpty: (ctx, evt) => {
      return ctx.water_level === 0;
    },
    waterNotEmpty: (ctx, evt) => {
      return ctx.water_level !== 0;
    },
    doneDraining: (ctx, evt) => {
      return ctx.water_level === 1;
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
            actions: ["setTimeToDrain"],
            cond: "waterNotEmpty",
          },
          DRY: {
            target: "drying",
            actions: ["setTimeToDry"],
            cond: "doneDraining",
          },
          UNLOAD: {
            target: "unloading",
          },
        },
      },
      loading: {
        on: {
          WASH: {
            target: "washing",
            actions: ["setTimeToWash"],
          },
        },
      },
      washing: {
        on: {
          CANCEL: "idle",
        },
        after: [
          {
            delay: (ctx, evt) => {
              return ctx.time;
            },
            target: "idle",
            actions: ["setTImeToZero"],
          },
        ],
      },
      draining: {
        on: {
          CANCEL: "idle",
        },
        after: [
          {
            delay: (ctx, evt) => {
              return ctx.time;
            },
            target: "idle",
            actions: ["draining", "setTimeToZero"],
          },
        ],
      },
      drying: {
        on: {
          CANCEL: "idle",
        },
        after: [
          {
            delay: (ctx, evt) => {
              return ctx.time;
            },
            target: "idle",
            actions: ["drying", "setTimeToZero"],
          },
        ],
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
