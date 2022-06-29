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

  // function notionPropertiesById(properties) {
  //   return Object.values(properties.results).reduce((obj, property) => {
  //     const { id, ...rest } = property;
  //     return { ...obj, [id]: rest };
  //   }, {});
  // }

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
      console.log(data.results);

      //================================ getting the important data

      // const name = data.results[0].properties.Name.title[0].plain_text;
      // const note = data.results[0].properties.Notes.rich_text[0].plain_text;
      // const date =0;
      // const duration =0;

      const usefulObj = dispatch(
        pomodoroActions.storeNotionObj({ notionObj: data.results })
      );
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
        <div className="flex-auto text-xl font-bold">
          <svg
            role="status"
            class="w-8 h-8 mx-80 my-80 text-gray-200 animate-spin dark:text-yellow-200 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          {/* <span className="visually-hidden">Loading...</span>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> */}
        </div>
      )}
    </div>
  );
};

export default ListOfSessions;
