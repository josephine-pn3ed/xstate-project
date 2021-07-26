import { StateValue } from "xstate";
import { IWashingContext } from "../machine/types";
import "../styles/index.css";
interface Props {
  value: StateValue;
  context: IWashingContext;
}

export const WashingMachine = (props: Props) => {
  const { value, context } = props;
  console.log(context.timer,"timeeeeeeeeeer");
  
  return (
    <>
      <div className="box-canvas">
        <div className="machine">
          <div className="drawer">{context.timer}</div>
          <div className="panel">{value}</div>
          <div className="door">
            <div
              className={`drum ${
                value === "washing" || value === "drying" ? "isWashing" : ""
              }`}
            >
              <div className="water">
                <div className={context.water_level ? "ripple-one" : ""}></div>
                <div className={context.water_level ? "ripple-two" : ""}></div>
                <div
                  className={context.water_level ? "ripple-three" : ""}
                ></div>
              </div>
              <div>
                <div
                  className={context.laundry_soap ? "soap soap-one" : ""}
                ></div>
                <div
                  className={context.laundry_soap ? "soap soap-two" : ""}
                ></div>
                <div
                  className={context.laundry_soap ? " soap soap-three" : ""}
                ></div>
                <div
                  className={context.laundry_soap ? "soap soap-four" : ""}
                ></div>
                <div
                  className={context.laundry_soap ? "soap soap-five" : ""}
                ></div>
                <div className={context.laundry_soap ? "soap-six" : ""}></div>
              </div>
              <span className={context.laundry ? "clothes" : ""}></span>
              <span className={context.laundry ? "clothes1" : ""}></span>
            </div>
            <div className="playground"></div>
          </div>
        </div>
      </div>
    </>
  );
};
