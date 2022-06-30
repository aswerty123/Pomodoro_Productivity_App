import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    isSession: false,
    isPause: false,
    isBreak: false,
    isSendingData: false,
    isModal: false,
    modalData: {
      name: "",
      note: "",
      date: "",
      startTime: "",
      endTime: "",
      durationSecs: "",
    },
    pagesObj: [],
    refreshList: true,
    timerSpeed: 1000,

    displayMinutes: 25,
    displaySeconds: 0,
    setDuration: 25,
    setBreak: 5,
    data: {
      name: "",
      note: "",
      startTime: "",
      endTime: "",
      durationSecs: 0,
    },
  },
  reducers: {
    //=============================== Timer reducers
    startSession(state) {
      state.isSession = true;
      state.isPause = false;
      state.data.startTime = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss");

      state.displayMinutes = state.setDuration;
      state.displaySeconds = 0;
    },

    endSession(state) {
      state.isSession = false;

      state.data.endTime = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss");
      state.data.durationSecs =
        (25 - state.displayMinutes) * 60 + state.displaySeconds;
      state.displayMinutes = state.setBreak;
      state.displaySeconds = 0;
      state.isBreak = true;
      state.isPause = true;
    },
    startBreak(state) {
      state.isBreak = true;
      state.isPause = false;

      state.displayMinutes = state.setBreak;
      state.displaySeconds = 0;
    },
    endBreak(state, action) {
      state.isBreak = false;

      state.displayMinutes = state.setDuration;
      state.displaySeconds = 0;

      state.isSession = true;
      state.isPause = true;
    },

    pause(state) {
      state.isPause = !state.isPause;
    },

    toggle(state) {
      state.isSession = !state.isSession;
      state.isBreak = !state.isBreak;
    },

    decreaseTimer(state) {
      if (
        state.displaySeconds === 0 &&
        state.displayMinutes > 0 &&
        state.isPause === false
      ) {
        state.displayMinutes -= 1;
        state.displaySeconds = 59;
      } else if (state.displaySeconds > 0 && state.isPause === false) {
        state.displaySeconds -= 1;
      } else if (state.displayMinutes === 0 && state.displaySeconds === 0) {
        console.log(`All time is spent`);
        if (state.isSession) {
          state.data.endTime = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss");
          // state.data.endTime = dayjs(new Date()).toISOString();
          state.data.durationSecs =
            (25 - state.displayMinutes) * 60 + state.displaySeconds;
        }
        state.isSession = !state.isSession;
        state.isBreak = !state.isBreak;
        state.isPause = true;
        state.isSession
          ? (state.displayMinutes = state.setDuration)
          : (state.displayMinutes = state.setBreak);
      }
    },
    //=============================== data reducers
    inputDataName(state, action) {
      state.data.name = action.payload.name;
    },
    inputDataNote(state, action) {
      state.data.note = action.payload.note;
    },
    resetData(state) {
      state.data = {
        name: "",
        note: "",
        startTime: "",
        endTime: "",
        durationSecs: 0,
      };
    },
    //=============================== get Obj from notion

    storeNotionObj(state, action) {
      state.pagesObj = action.payload.notionObj;
    },
    //=============================== is data send???

    setIsDataSend(state, action) {
      state.isSendingData = action.payload.state;
    },

    toggleRefreshList(state) {
      state.refreshList = !state.refreshList;
    },

    //================================ display modal

    displayMoreInfoModal(state, action) {
      state.modalData.name =
        state.pagesObj[
          action.payload.index
        ].properties.Name.title[0].plain_text;
      state.modalData.note =
        state.pagesObj[
          action.payload.index
        ].properties.Notes.rich_text[0].plain_text;

      state.modalData.date = dayjs(
        state.pagesObj[action.payload.index].properties.Date.date.start
      ).format("DD-MM-YYYY");

      state.modalData.startTime = dayjs(
        state.pagesObj[action.payload.index].properties.Date.date.start
      ).format("HH:mm:ss");

      state.modalData.endTime = dayjs(
        state.pagesObj[action.payload.index].properties.Date.date.end
      ).format("HH:mm:ss");

      state.modalData.durationSecs =
        state.pagesObj[action.payload.index].properties.Duration_in_Secs.number;

      state.isModal = true;
    },

    displayStatus(State, action) {},

    closeModal(state) {
      state.isModal = false;
    },
    //=================================== Set Speed
    setSpeed(state, action) {
      state.timerSpeed = action.payload.speed;
    },
  },
});

export const pomodoroActions = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
