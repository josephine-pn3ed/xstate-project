import { StateValue } from "xstate";
import { IWashingContext } from "../machine/types";
import "../styles/index.css";

interface Props {
  value: StateValue;
  context: IWashingContext;
}

export const WashingMachine = (props: Props) => {
  const { value, context } = props;

  return (
    <>
      <div className="box-canvas">
        <div className="machine">
          <div className="drawer">{context.timer}</div>
          <div className="panel">{value}</div>
          <div className="door">
            <div
              className={`drum ${
                value === "washing" ||
                value === "drying" ||
                value === "draining" ||
                value === "auto_washing" ||
                value === "auto_draining" ||
                value === "auto_drying"
                  ? "isWashing"
                  : ""
              }`}
            >
              <div className="water">
                <div
                  className={
                    context.water_level > 1
                      ? "ripple-one"
                      : context.water_level === 1
                      ? "ripple-four"
                      : ""
                  }
                ></div>
                <div
                  className={
                    context.water_level > 1
                      ? "ripple-two"
                      : context.water_level === 1
                      ? "ripple-five"
                      : ""
                  }
                ></div>
                <div
                  className={
                    context.water_level > 1
                      ? "ripple-three"
                      : context.water_level === 1
                      ? "ripple-six"
                      : ""
                  }
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
                  className={context.laundry_soap ? "soap soap-three" : ""}
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
