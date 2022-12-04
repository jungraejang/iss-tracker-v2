import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIssInfo } from "../slices/issSlice";

import Globe from "./Globe";

function MainPage() {
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("model use effect");
    setInterval(() => {
      dispatch(getIssInfo());
    }, 2000);
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h1 style={{ marginLeft: 40 }}>ISS 3D Tracker by JRJ</h1>
      <Globe />
    </div>
  );
}

export default MainPage;
