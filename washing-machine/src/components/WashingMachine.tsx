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
        <div className="drawer">{value}</div>
        <div className="panel"></div>
        <div className="door">
          <div className={`drum ${value === "washing" && "isWashing"}`}>
            <div className="water">
              <div className={context.water_level ? "ripple-one" : ""}></div>
              <div className={context.water_level ? "ripple-two" : ""}></div>
              <div className={context.water_level ? "ripple-three" : ""}></div>
            </div>
            <span className={context.laundry ? "clothes" : ""}></span>
            <span className={context.laundry ? "clothes1" : ""}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
