import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { pomodoroActions } from "../store/pomodoro";
import ErrorModal from "./ErrorModal";

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

      <div>
        <ul className="flex flex-wrap">
          {storePagesObj.map((page, i) => (
            <li
              className="block p-1 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-red-500 dark:border-gray-700 dark:hover:bg-gray-700 no-underline"
              key={page.id}
            >
              <div className="shadow bg-red-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded no-underline">
                Title:{page.properties.Name.title[0].plain_text}
              </div>
              <div>Notes:{page.properties.Notes.rich_text[0].plain_text}</div>
              <button
                onClick={() => handleMoreInfo(i)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
              >
                More Info
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DisplayList;
