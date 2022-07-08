import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
