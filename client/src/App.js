import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PomodoroSession from "./pages/PomodoroSession";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

function App() {
  const storeIsSession = useSelector((state) => state.pomodoro.isSession);
  const storeDisplayMinutes = useSelector(
    (state) => state.pomodoro.displayMinutes
  );
  const storeDisplaySeconds = useSelector(
    (state) => state.pomodoro.displaySeconds
  );
  const storeIsBreak = useSelector((state) => state.pomodoro.isBreak);
  const storeIsPause = useSelector((state) => state.pomodoro.isPause);

  return (
    <div
      className={storeIsSession ? "bg-red-300 h-full" : "bg-blue-300 h-full"}
    >
      <div className="flex">
        {storeIsSession && storeDisplayMinutes < 25 ? null : <NavBar />}
        <div className="flex-auto">
          <Routes>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/pomodoro-session" element={<PomodoroSession />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
