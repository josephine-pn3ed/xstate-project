import { ServiceConfig } from "xstate";
import { WashingContext, WashingEvent } from "../../types";
// let timeout: NodeJS.Timeout;
const services: Record<any, ServiceConfig<WashingContext, WashingEvent>> = {
  ticker: (ctx: WashingContext, evt: WashingEvent) => (send) => {
    const sendTick = () => {
      send('TICK')
    }
    const ticker = setInterval(sendTick, 1000)
    const stopTicker = () => {
      clearInterval(ticker)
    }
    return stopTicker
  },

  // washingTimer: (ctx) => (send) => {
  //   timeout = setTimeout(() => {
  //     send({
  //       type: "WASHING_TIMEOUT",
  //     });
  //   }, ctx.timer);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // },
  // drainingTimer: (ctx) => (send) => {
  //   timeout = setTimeout(() => {
  //     send({
  //       type: "DRAINING_TIMEOUT",
  //     });
  //   }, ctx.timer);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // },
  // dryingTimer: (ctx) => (send) => {
  //   timeout = setTimeout(() => {
  //     send({
  //       type: "DRYING_TIMEOUT",
  //     });
  //   }, ctx.timer);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // },
};
export default services;
