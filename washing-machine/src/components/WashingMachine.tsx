import { StateValue } from "xstate";
import { WashingContext } from "../machine/types";
import "../styles/index.css";
interface Props {
  value: StateValue;
  context: WashingContext;
}

export const WashingMachine = (props: Props) => {
  const { value, context } = props;
  return (
    <div className="box-canvas">
      <div className="machine">
        <div className="drawer"></div>
        <div className="panel">{value}</div>
        <div className="door">
          <div className={`drum ${value === "washing" && "isWashing"}`}>
            <div className="water">
              <div className={context.water_level ? "ripple-one" : ""}></div>
              <div className={context.water_level ? "ripple-two" : ""}></div>
              <div className={context.water_level ? "ripple-three" : ""}></div>
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
  );
};
