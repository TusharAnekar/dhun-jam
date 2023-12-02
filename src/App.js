import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="App flex min-h-screen items-center justify-center text-white">
      <div className="pages">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
