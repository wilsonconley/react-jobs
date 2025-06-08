import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";

function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer aria-label={"toast-container"} />
    </>
  );
}

export default MainLayout;
