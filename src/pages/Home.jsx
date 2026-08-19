import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [verify, setVerify] = useState("");

  const [check, setCheck] = useState(false);

  const [error, setError] = useState("");

  const { pass } = useContext(AuthContext);

  const navigate = useNavigate();

  const changeHandler = () => {
    if (verify == pass) {
      setCheck(true);
      setError("");
      navigate("/setting");
    } else {
      setCheck(false);
      setError("کد وارد شده صحیح نمیباشد");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Home Page
        </h1>

        <div  className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 text-center shadow-xl sm:p-8">
          <input
             value={verify}
            onChange={(e) => setVerify(e.target.value)}
            type="text"
            placeholder="کد تایید را وارد کنید"
            className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-center text-lg tracking-[0.35em] text-white outline-none transition placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          {error ? <h1 className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">{error}</h1> : ""}
        </div>
        <button
          onClick={changeHandler}
          className="mx-auto mt-6 block w-full max-w-md rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 active:scale-[0.98] sm:text-base"
        >
          <span className="text-base font-semibold sm:text-lg">
            تایید
          </span>
        </button>
      </div>
    </>
  );
}

export default Home;
