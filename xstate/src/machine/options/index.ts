const {
  loadWaterOnly,
  loadWaterAndLaundry,
  loadWaterAndSoap,
  loadWaterLaundryAndSoap,
  setTimeToWash,
  setTimeToDrain,
  setTimeToDry,
  setTimeToZero,
  cancelWashing,
  draining,
  cancelDraining,
  drying,
  cancelDrying,
  unloading,
} = require("./actions");
const {
  laundryNotEmptyAndWaterEmpty,
  laundryAndSoapEmpty,
  laundryNotEmptyAndWaterAndSoapEmpty,
  waterAndLaundryEmpty,
  waterNotEmpty,
  waterEmptyAndLaundryNotEmpty,
  laundryLeftOnly,
} = require("./guards");

const options = {
  actions: {
    loadWaterOnly,
    loadWaterAndLaundry,
    loadWaterAndSoap,
    loadWaterLaundryAndSoap,
    setTimeToWash,
    setTimeToDrain,
    setTimeToDry,
    setTimeToZero,
    cancelWashing,
    draining,
    cancelDraining,
    drying,
    cancelDrying,
    unloading,
  },
  guards: {
    laundryNotEmptyAndWaterEmpty,
    laundryAndSoapEmpty,
    laundryNotEmptyAndWaterAndSoapEmpty,
    waterAndLaundryEmpty,
    waterNotEmpty,
    waterEmptyAndLaundryNotEmpty,
    laundryLeftOnly,
  },
};

export default options;
