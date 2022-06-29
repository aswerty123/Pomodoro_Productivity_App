import React from "react";
import { useSelector } from "react-redux";

const PomodoroStateViewer = () => {
  const storeIsSession = useSelector((state) => state.pomodoro.isSession);
  const storeIsBreak = useSelector((state) => state.pomodoro.isBreak);
  const storeIsPause = useSelector((state) => state.pomodoro.isPause);

  const storeDisplayMinutes = useSelector(
    (state) => state.pomodoro.displayMinutes
  );
  const storeDisplaySeconds = useSelector(
    (state) => state.pomodoro.displaySeconds
  );
  const storeSetDuration = useSelector((state) => state.pomodoro.setDuration);
  const storeSetBreak = useSelector((state) => state.pomodoro.setBreak);
  const storeData = useSelector((state) => state.pomodoro.data);
  return (
    <div className="flex flex-col">
      <div className="text-2xl w-3/12">
        storeIsSession = {storeIsSession ? "TRUE" : "FALSE"}
      </div>
      <div className="text-2xl w-3/12">
        storeIsBreak = {storeIsBreak ? "TRUE" : "FALSE"}
      </div>
      <div className="text-2xl w-3/12">
        storeIsPause = {storeIsPause ? "TRUE" : "FALSE"}
      </div>
      <div className="text-2xl">
        storeDisplayMinutes = {storeDisplayMinutes}
      </div>
      <div className="text-2xl">
        storeDisplaySeconds = {storeDisplaySeconds}
      </div>
      <div className="text-2xl">storeSetDuration = {storeSetDuration}</div>
      <div className="text-2xl">storeSetBreak = {storeSetBreak}</div>
      <div className="text-2xl">storeBreak = {JSON.stringify(storeData)}</div>
    </div>
  );
};

export default PomodoroStateViewer;
