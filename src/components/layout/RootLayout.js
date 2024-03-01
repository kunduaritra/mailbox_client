import React from "react";
import NavigationBar from "../navbar/NavigationBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
