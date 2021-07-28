import { StateValue } from "xstate";
import { IWashingContext } from "../machine/types";
import "../styles/index.css";

interface Props {
  value: StateValue;
  context: IWashingContext;
}

export const WashingMachine = (props: Props) => {
  const { value, context } = props;
  const { timer, water_level, laundry, laundry_soap } = context;
  return (
    <>
      <div className="box-canvas">
        <div className="machine">
          <div className="drawer">{timer}</div>
          <div className="panel">{value}</div>
          <div className="door">
            <div
              className={`drum ${
                value === "washing" ||
                value === "drying" ||
                value === "auto_washing" ||
                value === "auto_drying"
                  ? "isWashing"
                  : ""
              }`}
            >
              <div className="water">
                <div
                  className={
                    water_level > 1
                      ? "ripple-one"
                      : water_level === 1
                      ? "ripple-four"
                      : ""
                  }
                ></div>
                <div
                  className={
                    water_level > 1
                      ? "ripple-two"
                      : water_level === 1
                      ? "ripple-five"
                      : ""
                  }
                ></div>
                <div
                  className={
                    water_level > 1
                      ? "ripple-three"
                      : water_level === 1
                      ? "ripple-six"
                      : ""
                  }
                ></div>
              </div>
              <div>
                <div className={laundry_soap ? "soap soap-one" : ""}></div>
                <div className={laundry_soap ? "soap soap-two" : ""}></div>
                <div className={laundry_soap ? "soap soap-three" : ""}></div>
                <div className={laundry_soap ? "soap soap-four" : ""}></div>
                <div className={laundry_soap ? "soap soap-five" : ""}></div>
                <div className={laundry_soap ? "soap-six" : ""}></div>
              </div>
              <span className={laundry ? "clothes" : ""}></span>
              <span className={laundry ? "clothes1" : ""}></span>
            </div>
            <div className="playground"></div>
          </div>
        </div>
      </div>
    </>
  );
};
