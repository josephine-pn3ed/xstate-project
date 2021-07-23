import {  ServiceConfig } from "xstate";
import { WashingContext, WashingEvent } from "../../types";
let timeout:NodeJS.Timeout
const services: Record<any, ServiceConfig<WashingContext, WashingEvent>> = {
  
  washingTimer: (ctx, event) => (send) => {
    timeout = setTimeout(() => {
      send({
        type: "WashingTimeout",
      });
    }, 10000);
    return ()=>{
      clearTimeout(timeout)
    }
  },
  drainingTimer: (ctx, event) => (send) => {
    timeout = setTimeout(() => {
      send({
        type: "DrainingTimeout",
      });
    }, 10000);
    return ()=>{
      clearTimeout(timeout)
    }
  },
  dryingTimer: (ctx, event) => (send) => {
    timeout = setTimeout(() => {
      send({
        type: "DryingTimeout",
      });
    }, 10000);
    return ()=>{
      clearTimeout(timeout)
    }
  },
};
export default services;
