import "../styles/index.css";
export const WashingMachine = () => {
  return (
    <div className="box-canvas">
      <div className="machine">
        <div className="drawer" >loading</div>
        <div className="panel"></div>
        <div className="door">
          <div className="drum">
            <span className="clothes"></span>
            <span className="clothes1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
