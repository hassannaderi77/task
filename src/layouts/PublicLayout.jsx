import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;