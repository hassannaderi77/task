import React from "react";
import { useNavigate } from "react-router-dom";


function LandingPage() {

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          welcome to modernio
        </h1>

        <button
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95 sm:px-8 sm:py-3.5 sm:text-base"
          onClick={clickHandler}
        >
          Request Demo
        </button>
      </div>
    </>
  );
}

export default LandingPage;
