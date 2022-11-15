import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Login from "../auth/login";
import Library from "../library";
import Player from "../player";
import "./home.css";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {

  }, []);

  //return !token ? (
  //  <Login />
  //) :
  return (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </div>
    </Router>
  );
}
