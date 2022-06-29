import React from "react";
import ListOfSessions from "../components/ListOfSessions";
import PomodoroStateViewer from "../components/PomodoroStateViewer";

const Dashboard = () => {
  return (
    <h2 className="flex-auto text-xl font-bold underline">
      <PomodoroStateViewer />
      <ListOfSessions />
    </h2>
  );
};

export default Dashboard;
