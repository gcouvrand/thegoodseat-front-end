import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import User from "./pages/User";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}
