import React from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components";
import { Company, Complex, Room } from "./pages";

export const Private = () => {
  return (
    <Routes>
      <Route path="/" element={<Company />} />
      <Route path="/complex" element={<Complex />} />
      <Route path="/room" element={<Room />} />
      <Route path="/bank" element={"Bank"} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
