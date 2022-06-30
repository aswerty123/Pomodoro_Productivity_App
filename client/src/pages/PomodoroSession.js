import React, { useEffect } from "react";

// import { useSelector } from "react-redux";

import Timer from "../components/Timer";
// import Form from "../components/Form";

const PomodorosSession = () => {
  // const storeIsBreak = useSelector((state) => state.pomodoro.isBreak);
  return (
    <>
      <div className="flex-col justify-center items-center grid ">
        <Timer />
      </div>
    </>
  );
};

export default PomodorosSession;
