
module.exports = {
  emptyContext: (context: any, event: any) => {
    const { water_level, laundry, laundry_soap, timer } = context;
    return (
      water_level === 0 && laundry === 0 && timer === 0 && laundry_soap === ""
    );
  },
  loadedContext: (context: any, event: any) => {
    const { water_level, laundry, laundry_soap } = context;
    return water_level !== 0 && laundry !== 0 && laundry_soap !== "";
  },
  withWaterLevel: (context: any, event: any) => {
    const { water_level } = context;
    return water_level === 0;
  },
  laundryAndLaundrySoapNotEmpty: (ctx: any, evt: any) => {
    return (ctx.laundry !== 0 && ctx.laundry_soap !== "");
  },
  laundryAndLaundrySoapEmpty: (ctx: any, evt: any) => {
    return (ctx.laundry === 0 && ctx.laundry_soap === "");
  }
};
