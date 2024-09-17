import "./App.css";
import { lazy} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Top from "./sections/top.tsx";

const Home = lazy(() => import("./pages/Main"));
const Page1 = lazy(() => import("./pages/Page1"));

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
