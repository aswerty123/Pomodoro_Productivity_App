import React from "react";
import ListOfSessions from "../components/ListOfSessions";

const Dashboard = () => {
  return (
    <>
      <div className=" font-bold  grid justify-center">
        <ListOfSessions />
      </div>
    </>
  );
};

export default Dashboard;
