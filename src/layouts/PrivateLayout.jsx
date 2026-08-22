import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function PrivateLayout() {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;