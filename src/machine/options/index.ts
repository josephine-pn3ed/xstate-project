const {
  loadContext,
  removeLaundrySoap,
  removeWaterLevel,
  setTimer,
  unload,
} = require("./actions");
const { emptyContext, loadedContext, withWaterLevel } = require("./guards");

const options = {
  actions: {
    loadContext,
    removeLaundrySoap,
    removeWaterLevel,
    setTimer,
    unload,
  },
  guards: { emptyContext, loadedContext, withWaterLevel }
};

export default options;