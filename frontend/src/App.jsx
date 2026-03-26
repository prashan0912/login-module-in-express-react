import "./App.css";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../StoreContext/storeContext";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ProtectedProfile from "./pages/profile/ProtectedProfile";
import Logout from "./Component/Logout";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/profile"
          element={
            <ProtectedProfile>
              <Profile />
            </ProtectedProfile>
          }
        />
      </Routes>
    </>
  );
}
export default App;
