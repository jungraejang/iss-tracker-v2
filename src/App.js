import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { store } from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
