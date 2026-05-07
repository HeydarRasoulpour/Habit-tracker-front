import { Routes, Route, Navigate } from "react-router-dom";
import Modal from "react-modal";

import Routing from "../components/routing/Routing";
import PublicRoute from "./auth/PublicRoute";

export default function App() {
  Modal.setAppElement("#root");
  return <Routing />;
}
