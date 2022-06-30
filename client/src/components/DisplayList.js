import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pomodoroActions } from "../store/pomodoro";
import MoreInfoModal from "./MoreInfoModal";
import dayjs from "dayjs";

const DisplayList = (props) => {
  const dispatch = useDispatch();
  const storePagesObj = useSelector((state) => state.pomodoro.pagesObj);
  const storeModalDataNote = useSelector(
    (state) => state.pomodoro.modalData.note
  );
  const storeIsModal = useSelector((state) => state.pomodoro.isModal);
  // const name = data.results[0].properties.Name.title[0].plain_text;
  // const note = data.results[0].properties.Notes.rich_text[0].plain_text;
  // const date =0;
  // const duration =0;
  const [inputDate, setInputDate] = useState("");
  const [inputSum, setInputSum] = useState("");

  const handleModalOkay = () => {
    dispatch(pomodoroActions.closeModal());
    console.log("Hello");
  };

  const handleMoreInfo = (i) => {
    // console.log(i);
    // console.log(storePagesObj[i].properties.Notes.rich_text[0].plain_text);

    dispatch(pomodoroActions.displayMoreInfoModal({ index: i }));
  };

  const deleteDataFromNotion = (key) => {
    dispatch(pomodoroActions.setIsDataSend({ state: true }));

    console.log({ key });
    fetch("http://localhost:4000/deleteDataFromNotion", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pageID: key }),
    })
      .then((response) => {
        dispatch(pomodoroActions.toggleRefreshList());
        return response.json();
      })
      .then((data) => {
        console.log("Success!", data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    dispatch(pomodoroActions.setIsDataSend({ state: false }));
  };

  const handleDateInput = (event) => {
    // console.log(event.target.value);
    setInputDate(event.target.value);
  };

  //calculate the sum of duration

  useEffect(() => {
    if (inputDate === "") {
      let sum = 0;
      storePagesObj.map((page, i) => {
        // console.log(page.properties.Duration_in_Secs.number);
        sum += page.properties.Duration_in_Secs.number;
      });
      setInputSum(sum);
    } else {
      let sum = 0;
      storePagesObj.map((page, i) => {
        if (
          dayjs(page.properties.Date.date.start).format("YYYY-MM-DD") ===
          inputDate
        ) {
          sum += page.properties.Duration_in_Secs.number;
        }
      });
      setInputSum(sum);
    }
  }, [inputDate]);

  return (
    <>
      {/* <h4>{JSON.stringify(thisState)}</h4> */}
      {storeIsModal && (
        <MoreInfoModal
          title="Detailed Information"
          okayClicked={handleModalOkay}
        ></MoreInfoModal>
      )}

      <div className="flex justify-between items-center m-4">
        <input type="date" onChange={handleDateInput} className="m-5" />
        <div
          className={
            inputDate === ""
              ? "bg-blue-500 text-white font-bold py-2 px-4 rounded"
              : inputSum / 60 / 60 > 5
              ? "bg-green-500 text-white font-bold py-2 px-4 rounded"
              : inputSum / 60 / 60 < 1
              ? "bg-red-600 text-white font-bold py-2 px-4 rounded"
              : "bg-yellow-400 text-white font-bold py-2 px-4 rounded"
          }
        >
          Total Duration:{"   "}
          {Math.round((inputSum / 60 / 60) * 100) / 100}
          {"   "}Hrs
        </div>
      </div>
      <div className="p-4 max-w-[35rem] rounded-lg border shadow-md bg-red-500 border-red-700">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-4xl   text-white">List of Sessions</h5>
          {/* <a
            href="#"
            className="text-sm font-medium text-white hover:underline "
          >
            View all
          </a> */}
        </div>
        {/* state.modalData.date = dayjs(
        state.pagesObj[action.payload.index].properties.Date.date.start
      ).format("DD-MM-YYYY"); */}
        <div>
          <ul className="divide-y divide-gray-200 ">
            {storePagesObj.map((page, i) =>
              inputDate === "" ? (
                <li className="py-3 " key={page.id}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-md font-medium text-white">
                        <span className="text-lg text-bold text-red-900">
                          Title:{"  "}
                        </span>
                        {page.properties.Name.title[0].plain_text}
                      </p>
                      <p className="text-md font-medium text-white ">
                        <span className="text-md text-bold text-red-900">
                          Date:{"  "}
                        </span>
                        {dayjs(page.properties.Date.date.start).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        type="button"
                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-red-700 rounded-l-full border border-gray-200 hover:bg-gray-100 hover:text-red-900"
                        onClick={() => deleteDataFromNotion(page.id)}
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        className="py-2 px-4 text-sm font-medium text-gray-900 bg-blue-700 rounded-r-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 "
                        onClick={() => handleMoreInfo(i)}
                      >
                        Info
                      </button>
                    </div>
                  </div>
                </li>
              ) : (
                dayjs(page.properties.Date.date.start).format("YYYY-MM-DD") ===
                  inputDate && (
                  <li className="py-3 " key={page.id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-md font-medium text-white">
                          <span className="text-lg text-bold text-red-900">
                            Title:{"  "}
                          </span>
                          {page.properties.Name.title[0].plain_text}
                        </p>
                        <p className="text-md font-medium text-white ">
                          <span className="text-md text-bold text-red-900">
                            Date:{"  "}
                          </span>
                          {dayjs(page.properties.Date.date.start).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                      </div>
                      <div
                        className="inline-flex rounded-md shadow-sm"
                        role="group"
                      >
                        <button
                          type="button"
                          className="py-2 px-4 text-sm font-medium text-gray-900 bg-red-700 rounded-l-full border border-gray-200 hover:bg-gray-100 hover:text-red-900"
                          onClick={() => deleteDataFromNotion(page.id)}
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          className="py-2 px-4 text-sm font-medium text-gray-900 bg-blue-700 rounded-r-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 "
                          onClick={() => handleMoreInfo(i)}
                        >
                          Info
                        </button>
                      </div>
                    </div>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DisplayList;
