import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { pomodoroActions } from "../store/pomodoro";
import ErrorModal from "./ErrorModal";
import dayjs from "dayjs";

const DisplayList = () => {
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

  const handleModalOkay = () => {
    dispatch(pomodoroActions.closeModal());
    console.log("Hello");
  };

  const handleMoreInfo = (i) => {
    // console.log(i);
    // console.log(storePagesObj[i].properties.Notes.rich_text[0].plain_text);

    dispatch(pomodoroActions.displayErrorModal({ index: i }));
  };

  return (
    <>
      {storeIsModal && (
        <ErrorModal
          title="Detailed Information"
          message={storeModalDataNote}
          okayClicked={handleModalOkay}
        ></ErrorModal>
      )}

      <div className="flex ">
        {/* <ul className="flex-col flex-wrap">
          {storePagesObj.map((page, i) => (
            <li
              className="block p-1 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-red-500 dark:border-gray-700 dark:hover:bg-gray-700"
              key={page.id}
            >
              <div className="flex-auto flex-wrap">
                <div className="shadow bg-red-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ">
                  Title:{page.properties.Name.title[0].plain_text}{" "}
                </div>

                <button
                  onClick={() => handleMoreInfo(i)}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
                >
                  More Info
                </button>
              </div>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="p-4 w-96 rounded-lg border shadow-md bg-red-500 border-red-700">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-4xl   text-white">List of Sessions</h5>
          <a
            href="#"
            className="text-sm font-medium text-white hover:underline "
          >
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 ">
            {storePagesObj.map((page, i) => (
              <li className="py-3 " key={page.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      <span className="text-lg text-bold text-red-900">
                        Title:
                      </span>
                      {page.properties.Name.title[0].plain_text}
                    </p>
                    <p className="text-sm text-red-900 ">
                      Date:{" "}
                      {dayjs(page.properties.Date.date.start).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button
                      onClick={() => handleMoreInfo(i)}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DisplayList;
