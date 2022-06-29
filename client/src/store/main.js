import { configureStore } from "@reduxjs/toolkit";
import pomodoroReducer from "./pomodoro";

const store = configureStore({
  reducer: { pomodoro: pomodoroReducer },
});

export default store;
