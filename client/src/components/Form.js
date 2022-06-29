// import React, { useState } from "react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pomodoroActions } from "../store/pomodoro";

const Form = (props) => {
  const dispatch = useDispatch();
  const storeDataNote = useSelector((state) => state.pomodoro.data.note);
  const storeDataName = useSelector((state) => state.pomodoro.data.name);
  //   const [userInput, setUserInput] = useState("");
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     props.getUserInput(userInput);
  //     dispatch(pomodoroActions.inputdata({ userData: userInput }));
  //     setUserInput("");
  //   };

  return (
    <>
      <div className="flex justify-center items-center">
        <a
          href="https://www.notion.so/03f86a2e36c94b8897214ce91641ec0c?v=590189a6433d48e5b23f8e91e8597714"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <button className=" bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded text-md">
            Check Out the notion Database
          </button>
        </a>
      </div>
      {/* <div className="flex justify-center items-center h-screen mx-auto bg-gray-100"> */}
      <div className="flex justify-center items-center ">
        <form action="#" className="w-full md:w-3/6 lg:w-3/4  p-4">
          <div className="p-3">
            <input
              className="block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300"
              type="text"
              placeholder="Please write the Short Summary of session"
              required
              id="name"
              onChange={(event) =>
                dispatch(
                  pomodoroActions.inputDataName({ name: event.target.value })
                )
              }
              value={storeDataName}
            />
          </div>

          <div className="p-3">
            <textarea
              className="resize-none  block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300 h-56"
              placeholder="Please write your notes here"
              required
              id="note"
              onChange={(event) =>
                dispatch(
                  pomodoroActions.inputDataNote({ note: event.target.value })
                )
              }
              value={storeDataNote}
            ></textarea>
          </div>
        </form>
      </div>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <textarea
        value={storeDataNote}
        placeholder="Please write your notes here"
        onChange={handleChange}
        name="note"
        className="
          form-control
          block
          w-8/12
          max-h-1/12
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          mx-40 my-10
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
      /> */}
      {/* <button type="submit">End Session Now</button> */}
      {/* </form> */}
    </>
  );
};

export default Form;
