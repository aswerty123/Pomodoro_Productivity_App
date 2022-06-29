import React, { useEffect } from "react";

// import { useSelector } from "react-redux";

import Timer from "../components/Timer";
import PomodoroStateViewer from "../components/PomodoroStateViewer";
// import Form from "../components/Form";

const PomodorosSession = () => {
  // const storeIsBreak = useSelector((state) => state.pomodoro.isBreak);
  return (
    <>
      <div className="flex-box items-center ">
        <Timer />
        <PomodoroStateViewer />
      </div>
    </>
  );
};

export default PomodorosSession;
