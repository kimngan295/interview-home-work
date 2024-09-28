import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./containers/HomePage"; // Import component HomePage
import SignUp  from "./containers/SignUp";
import SignIn from "./containers/SignIn";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Định nghĩa route cho trang Home */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* Bạn có thể thêm các route khác tại đây */}
    </Routes>
  );
};

export default AppRoutes;
