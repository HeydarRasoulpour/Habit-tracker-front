import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "../auth/PrivateRoute";
import PublicRoute from "../auth/PublicRoute";
import Home from "../pages/Home";
import AddHabit from "../pages/AddHabit";
import Habits from "../pages/Habits";
import CompletedHabits from "../pages/CompletedHabits";
import Login from "../auth/Login";
import CreateAccount from "../pages/CreateAccount";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* PUBLIC */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Route>

      {/* PRIVATE */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/completed" element={<CompletedHabits />} />
        <Route path="/addHabit" element={<AddHabit />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
