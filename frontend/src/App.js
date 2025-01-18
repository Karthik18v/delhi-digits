import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Route using Component Prop */}
        <Route path="/" element={<ProtectedRoute Component={Home} />} />
      </Routes>
    </Router>
  );
}

export default App;
