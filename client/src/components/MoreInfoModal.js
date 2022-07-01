import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import { AiOutlineClose } from "react-icons/ai";

const OverLay = (props) => {
  const storeModalData = useSelector((state) => state.pomodoro.modalData);
  return (
    <div
      className="fixed top-0 right-0 w-full h-screen z-10 bg-black bg-opacity-75"
      // onClick={props.okayClicked}
    >
      <div className="bg-white shadow-gray-900 rounded-xl fixed top-[10vh] left-[10%] w-[80%] z-100 flex-wrap h-[30rem]">
        <header className="bg-red-700 p-[1rem] text-white m-0 rounded-t-xl">
          <h2>{props.title}</h2>
        </header>
        <div class="w-full p-2 ">
          <div className="font-bold text-xl mb-2 underline">Note</div>
          <div class="px-2 py-2 bg-white rounded-lg shadow-lg h-[13rem]">
            <div className="text-gray-700 text-base m-2">
              <div className="font-bold">{storeModalData.name}:</div>
              {storeModalData.note}
            </div>
          </div>
        </div>

        <div class="max-w-screen-xl mx-auto px-2">
          <div class="px-1 py-1">
            <div class="w-full p-1">
              <div className="font-bold text-sm mb-2 underline">
                Date {"&"} Timings
              </div>
              <div class="px-1 py-1 bg-white rounded-lg shadow-lg flex flex-row">
                <div className="text-gray-700 text-sm m-2">
                  <div className="font-bold">Date:{"   "}</div>
                  {storeModalData.date}
                </div>
                <div className="text-gray-700 text-sm m-2">
                  <div className="font-bold">Start Time:{"   "}</div>
                  {storeModalData.startTime}
                </div>
                <div className="text-gray-700 text-sm m-2">
                  <div className="font-bold">End Time:{"   "}</div>
                  {storeModalData.endTime}
                </div>
                <div className="text-gray-700 text-sm m-2">
                  <div className="font-bold">Duration:{"   "}</div>
                  {storeModalData.durationSecs}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="p-[1rem] flex justify-end">
          <button onClick={props.okayClicked}>
            <AiOutlineClose className="hover:text-red-600" size={30} />
          </button>
        </footer>
      </div>
    </div>
  );
};

const MoreInfoModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          title={props.title}
          message={props.message}
          okayClicked={props.okayClicked}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default MoreInfoModal;
