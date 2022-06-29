import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pomodoroActions } from "../store/pomodoro";
import DisplayList from "./DisplayList";

const ListOfSessions = () => {
  const dispatch = useDispatch();
  const storeIsSendingData = useSelector(
    (state) => state.pomodoro.isSendingData
  );
  const storeIsBreak = useSelector((state) => state.pomodoro.isBreak);
  const storePagesObj = useSelector((state) => state.pomodoro.pagesObj);

  const [Obj, setObj] = useState({});
  const [error, setError] = useState(null);

  //   function notionPropertiesById(properties) {
  //     return Object.values(properties.results).reduce((obj, property) => {
  //       const { id, ...rest } = property;
  //       return { ...obj, [id]: rest };
  //     }, {});
  //   }

  //================================ useEffect to fetch data for every search button click

  useEffect(() => {
    const url = `http://localhost:4000/submitDataToNotion`;
    const controller = new AbortController();
    fetchPost(url, controller.signal);
    // console.log(toggle ? "true" : "false");

    return () => {
      controller.abort();
    };
  }, [storeIsBreak]);

  //=============================== fetchpost function to fetch data and get error message

  const fetchPost = async (url, signal) => {
    dispatch(pomodoroActions.setIsDataSend({ state: true }));
    setError(null);

    try {
      const res = await fetch(url, { signal });
      if (res.status !== 200) {
        throw new Error("Oops... Something went wrong...");
      }
      const data = await res.json();
      console.log(data);

      dispatch(pomodoroActions.storeNotionObj({ notionObj: data.results }));
    } catch (err) {
      setError(err.message);
    }
    dispatch(pomodoroActions.setIsDataSend({ state: false }));
  };
  return (
    <div>
      {!storeIsSendingData && error && <div className="centered">{error}</div>}
      {/* {!storeIsSendingData && JSON.stringify(storePagesObj)} */}
      {!storeIsSendingData && <DisplayList />}
      {storeIsSendingData && (
        <div
          className="spinner-border text-primary centered text-center"
          style={{ height: "6rem", width: "6rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default ListOfSessions;
