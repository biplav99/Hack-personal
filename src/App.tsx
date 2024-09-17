import "./App.css";
import { lazy} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Top from "./sections/top.tsx";

const Home = lazy(() => import("./pages/Main"));
const Page1 = lazy(() => import("./pages/Page1"));
const Login = lazy(() => import("./pages/Login.jsx"));
const DashBoard = lazy(() => import("./pages/PageLayout.jsx"));

function App() {
  return (
    <BrowserRouter>
      <div className="TopContainer">
        <Top />
      </div>
      <div className="MainContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
