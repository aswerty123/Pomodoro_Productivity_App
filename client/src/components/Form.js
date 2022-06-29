// import React, { useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { pomodoroActions } from "../store/pomodoro";

const Form = (props) => {
  const dispatch = useDispatch();
  const storeDataNote = useSelector((state) => state.pomodoro.data.note);
  //   const [userInput, setUserInput] = useState("");
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     props.getUserInput(userInput);
  //     dispatch(pomodoroActions.inputdata({ userData: userInput }));
  //     setUserInput("");
  //   };

  const handleChange = (event) => {
    // setUserInput(event.target.value);
    dispatch(pomodoroActions.inputdata({ userData: event.target.value }));
  };
  return (
    <>
      {/* <div className="flex justify-center items-center h-screen mx-auto bg-gray-100"> */}
      <div className="flex justify-center items-center ">
        <form action="#" className="w-full md:w-3/4 lg:w-3/6 p-4">
          <div className="p-3">
            <input
              className="block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300"
              type="text"
              placeholder="Please write the Short Summary of session"
              required
            />
          </div>

          <div className="p-3">
            <textarea
              className="resize-none  block appearance-none placeholder-gray-500 placeholder-opacity-100 border border-light-blue-400 rounded-md w-full py-3 px-4 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-light-blue-300 h-56"
              placeholder="Please write your notes here"
              required
              onChange={handleChange}
              value={storeDataNote}
            ></textarea>
          </div>
          <div className="p-3 pt-4">
            <button className="w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded text-2xl">
              Send
            </button>
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
