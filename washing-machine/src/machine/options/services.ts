import {  ServiceConfig, Sender } from "xstate";
import { WashingContext, WashingEvent } from "../types";

const services: Record<any, ServiceConfig<WashingContext, WashingEvent>> = {
  washingTimer: (ctx, event) => (send: Sender<WashingEvent>) => {
    setTimeout(() => {
      send({
        type: "WashingTimeout",
      });
    }, ctx.timer);
  },
  drainingTimer: (ctx, event) => (send: Sender<WashingEvent>) => {
    setTimeout(() => {
      send({
        type: "DrainingTimeout",
      });
    }, ctx.timer);
  },
  dryingTimer: (ctx, event) => (send: Sender<WashingEvent>) => {
    setTimeout(() => {
      send({
        type: "DryingTimeout",
      });
    }, ctx.timer);
  },
};
export default services;
