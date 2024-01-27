import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<h2 className="flex flex-col">Paytm Karo</h2>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
