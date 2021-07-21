const options = {
  actions: {
    loadWaterOnly: assign({
      water_level: (ctx, evt) => 8,
    }),
    loadWaterAndLaundry: assign({
      water_level: (ctx, evt) => 8,
      laundry: (ctx, evt) => 10,
    }),
    loadWaterAndSoap: assign({
      water_level: (ctx, evt) => 8,
      laundry_soap: (ctx, evt) => "Calla",
    }),
    loadWaterLaundryAndSoap: assign({
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
    cancelWashing: assign({
      timer: (ctx, evt) => timer / 2,
    }),
    draining: assign({
      water_level: (ctx, evt) => 1,
      laundry_soap: (ctx, evt) => "",
    }),
    cancelDraining: assign({
      water_level: (ctx, evt) => water_level / 2,
      timer: (ctx, evt) => timer / 2,
    }),
    drying: assign({
      water_level: (ctx, evt) => 0,
    }),
    cancelDrying: assign({
      timer: (ctx, evt) => timer / 2,
    }),
    unloading: assign({
      laundry: (ctx, evt) => 0,
    }),
  },
  guards: {
    laundryNotEmptyAndWaterEmpty: (ctx, _) => {
      return ctx.laundry !== 0 && ctx.water_level <= 1;
    },
    laundryAndSoapEmpty: (ctx, _) => {
      return ctx.laundry === 0 && ctx.laundry_soap === "";
    },
    laundryNotEmptyAndWaterAndSoapEmpty: (ctx, _) => {
      return (
        ctx.laundry !== 0 && ctx.water_level <= 1 && ctx.laundry_soap === ""
      );
    },
    waterAndLaundryEmpty: (ctx, _) => {
      return ctx.water_level === 0 && ctx.laundry === 0;
    },
    waterNotEmpty: (ctx, _) => {
      return ctx.water_level > 1;
    },
    waterEmptyAndLaundryNotEmpty: (ctx, _) => {
      return ctx.water_level === 1 && ctx.laundry !== 0;
    },
    laundryLeftOnly: (ctx, _) => {
      return (
        ctx.water_level === 0 &&
        ctx.laundry_soap === "" &&
        ctx.timer === 0 &&
        ctx.laundry !== 0
      );
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
          LOAD_WATER_AND_LAUNDRY: {
            target: "loading",
            actions: ["loadWaterAndLaundry"],
            cond: "waterAndLaundryEmpty",
          },
          LOAD_WATER_LAUNDRY_AND_SOAP: {
            target: "loading",
            actions: ["loadWaterLaundryAndSoap"],
            cond: "laundryAndSoapEmpty",
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
          CANCEL: {
            target: "idle",
            actions: ["cancelWashing"],
          },
        },
        after: [
          {
            delay: 5000,
            target: "idle",
            actions: ["setTimeToZero"],
          },
        ],
      },
      draining: {
        on: {
          CANCEL: {
            target: "idle",
            actions: ["cancelDraining"],
          },
        },
        after: [
          {
            delay: 4000,
            target: "idle",
            actions: ["draining", "setTimeToZero"],
          },
        ],
      },
      drying: {
        on: {
          CANCEL: {
            target: "idle",
            actions: ["cancelDrying"],
          },
        },
        after: [
          {
            delay: 3000,
            target: "idle",
            actions: ["drying", "setTimeToZero"],
          },
        ],
      },
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
