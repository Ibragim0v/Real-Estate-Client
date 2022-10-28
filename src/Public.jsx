import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import { NotFound, Login } from "./components";

export const Public = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
