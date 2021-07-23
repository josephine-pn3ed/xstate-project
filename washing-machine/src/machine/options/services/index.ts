import { ServiceConfig } from "xstate";
import { WashingContext, WashingEvent } from "../../types";


import callbacks from "./callbacks";
const services: Record<any,ServiceConfig<WashingContext, WashingEvent>> = {
  ...callbacks,
};

export default services;
