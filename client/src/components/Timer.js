import React, { useEffect } from "react";

import { BsFillStopwatchFill } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { pomodoroActions } from "../store/pomodoro";
import Form from "./Form";

const Timer = () => {
  const dispatch = useDispatch();

  const storeIsSession = useSelector((state) => state.pomodoro.isSession);
  const storeIsPause = useSelector((state) => state.pomodoro.isPause);
  const storeIsBreak = useSelector((state) => state.pomodoro.isBreak);
  const storeDisplayMinutes = useSelector(
    (state) => state.pomodoro.displayMinutes
  );
  const storeDisplaySeconds = useSelector(
    (state) => state.pomodoro.displaySeconds
  );
  const storeData = useSelector((state) => state.pomodoro.data);
  const storeTimerSpeed = useSelector((state) => state.pomodoro.timerSpeed);

  useEffect(() => {
    if (
      storeIsSession ||
      storeIsBreak
      // &&
      // storeDisplayMinutes !== 0 &&
      // storeDisplaySeconds !== 0
    ) {
      const intervalId = setInterval(() => {
        dispatch(pomodoroActions.decreaseTimer());
      }, storeTimerSpeed);
      return () => clearInterval(intervalId);
    }
  }, [storeIsBreak, storeIsSession, storeIsPause, storeTimerSpeed]);

  const submitDataToNotionAfterSession = () => {
    dispatch(pomodoroActions.startBreak());
    dispatch(pomodoroActions.setIsDataSend({ state: true }));
    fetch("http://localhost:4000/submitDataToNotion", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success!", data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    dispatch(pomodoroActions.setIsDataSend({ state: false }));
    dispatch(pomodoroActions.resetData());
  };

  return (
    <>
      <div className="flex-col content-center w-full">
        {/* <div className="flex-col content-center w-7/12 my-10 sm:ml-40 md:ml-60 lg:ml-80"> */}
        {/* <div className="flex-col content-center lg:w-100 lg:max-h-4"> */}
        {/* <div className="flex-col justify-center items-center  bg-gray-100"> */}
        {/* <div className="flex-col justify-center items-center"> */}
        <div className="flex content-center text-9xl text-white p-10 mx-20 bg-red-500 shadow-lg shadow-red-500/50 rounded-lg my-5">
          {storeDisplayMinutes < 10
            ? "0" + storeDisplayMinutes
            : storeDisplayMinutes}
          :
          {storeDisplaySeconds < 10
            ? "0" + storeDisplaySeconds
            : storeDisplaySeconds}
        </div>
        <div className="flex align-items-center justify-center items-center ">
          {!storeIsSession && !storeIsBreak && (
            <button
              className="text-3xl bg-red-500  hover:bg-green-700 rounded-full p-5 w-5/12 "
              onClick={() =>
                storeIsPause
                  ? dispatch(pomodoroActions.pause())
                  : dispatch(pomodoroActions.startSession())
              }
            >
              START
            </button>
          )}
          {storeIsSession &&
            !storeIsBreak &&
            (storeIsPause ? (
              <button
                className="text-3xl bg-red-500 hover:bg-green-700 rounded-full p-5 w-5/12"
                onClick={() =>
                  storeDisplayMinutes === 25
                    ? dispatch(pomodoroActions.startSession())
                    : dispatch(pomodoroActions.pause())
                }
              >
                START
              </button>
            ) : (
              <>
                <button
                  className="text-3xl bg-red-500 hover:bg-sky-700 rounded-full p-5 w-5/12"
                  onClick={() => dispatch(pomodoroActions.pause())}
                >
                  STOP
                </button>
                <button
                  className="text-5xl"
                  onClick={() => dispatch(pomodoroActions.endSession())}
                >
                  <BsFillStopwatchFill
                    className="hover:text-gray-900 text-white font-bold py-3 px-4 rounded text-md my-5"
                    size={80}
                  />
                </button>
              </>
            ))}
          {!storeIsSession &&
            storeIsBreak &&
            (storeIsPause ? (
              <button
                className="text-3xl bg-red-500 hover:bg-purple-400 rounded-full p-5 w-5/12"
                onClick={() =>
                  storeDisplayMinutes === 5
                    ? submitDataToNotionAfterSession()
                    : dispatch(pomodoroActions.pause())
                }
              >
                START
              </button>
            ) : (
              <>
                <button
                  className="text-3xl bg-red-500 hover:bg-sky-700 rounded-full p-5 w-5/12"
                  onClick={() => dispatch(pomodoroActions.pause())}
                >
                  STOP
                </button>
                <button
                  className="text-5xl "
                  onClick={() => dispatch(pomodoroActions.endBreak())}
                >
                  <BsFillStopwatchFill
                    className="hover:text-gray-900 text-white font-bold py-3 px-4 rounded text-md my-5"
                    size={70}
                  />
                </button>
              </>
            ))}
        </div>

        <Form />
      </div>
      {/* <button onClick={() => submitDataToNotionAfterSession()}>Submit To Notion</button> */}
    </>
  );
};

export default Timer;
