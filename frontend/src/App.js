import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./containers/HomePage";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* Redirect đến /signin nếu không tìm thấy route nào khác */}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
};

export default App;
