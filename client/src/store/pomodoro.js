import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    isSession: false,
    isPause: false,
    isBreak: false,
    isSendingData: false,
    pagesObj: [],

    displayMinutes: 25,
    displaySeconds: 0,
    setDuration: 25,
    setBreak: 5,
    data: {
      name: "....",
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
    inputdata(state, action) {
      state.data.note = action.payload.userData;
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
  },
});

export const pomodoroActions = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
