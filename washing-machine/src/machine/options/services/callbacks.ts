import {  actions, ServiceConfig } from "xstate";
import { assign } from "xstate/lib/actionTypes";
import { IWashingContext, IWashingEvent } from "../../types";
let timeout: NodeJS.Timeout;
const services: Record<any, ServiceConfig<IWashingContext, IWashingEvent>> = {
  // countDownTimer:(ctx)=>(send)=>{
  //   if(ctx.timer === 0){
  //     send({

  //     })
  //   }
  // },


  ticker: (ctx: IWashingContext, evt: IWashingEvent) => (send) => {
    const sendTick = () => {
      console.log("KO")      
    }
    const ticker = setInterval(sendTick,1000)
    const stopTicker = () => {
      clearInterval(ticker)
    }
    return stopTicker
  },

  washingTimer: (ctx) => (send) => {
    const sendTick = () => {
      console.log("KO")
      
    }
    const ticker = setInterval(sendTick,1000)
    timeout = setTimeout(() => {
      send({
        type: "WASHING_TIMEOUT",
      });
    }, ctx.timer);
    return () => {
      clearTimeout(timeout);
      clearInterval(ticker)
    };
  },
  drainingTimer: (ctx) => (send) => {
    timeout = setTimeout(() => {
      send({
        type: "DRAINING_TIMEOUT",
      });
    }, ctx.timer);
    return () => {
      clearTimeout(timeout);
    };
  },
  dryingTimer: (ctx) => (send) => {
    timeout = setTimeout(() => {
      send({
        type: "DRYING_TIMEOUT",
      });
    }, ctx.timer);
    return () => {
      clearTimeout(timeout);
    };
  },
};
export default services;
