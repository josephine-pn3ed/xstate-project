import { createModel } from "xstate/lib/model";

const washingMachineModel = createModel({
  water_level: 0,
  laundry: 0,
  laundry_soap: "",
  timer: 0,
});
