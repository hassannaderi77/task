import React from "react";
import { useNavigate } from "react-router-dom";


function LandingPage() {

  const navigate = useNavigate();


  const loginHandler = () => {
    navigate("/home");
  };


  const signUpHandler = () => {
    navigate("/login");
  };


  return (
    <div
      dir="rtl"
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-blue-950
      px-4
      "
    >


      <div
        className="
        w-full
        max-w-3xl
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        text-center
        shadow-2xl
        backdrop-blur-xl
        sm:p-12
        "
      >


        <div
          className="
          mx-auto
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-blue-600/20
          text-4xl
          "
        >
          🚀
        </div>



        <h1
          className="
          text-4xl
          font-black
          text-white
          sm:text-5xl
          md:text-6xl
          "
        >
          Welcome to Modernio
        </h1>



        <p
          className="
          mx-auto
          mt-5
          max-w-xl
          text-sm
          leading-7
          text-slate-400
          sm:text-base
          "
        >
          یک پلتفرم مدرن برای مدیریت درخواست‌ها،
          ثبت اطلاعات و ارتباط بهتر با مشتریان
        </p>



        <div
          className="
          mt-10
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:justify-center
          "
        >


          <button
            onClick={loginHandler}
            className="
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            px-8
            py-3.5
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/30
            transition
            hover:scale-105
            hover:shadow-blue-500/50
            active:scale-95
            "
          >
            Request Demo
          </button>



          <button
            onClick={signUpHandler}
            className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-8
            py-3.5
            font-bold
            text-white
            transition
            hover:bg-white/10
            hover:scale-105
            active:scale-95
            "
          >
            ثبت نام / ورود
          </button>


        </div>


      </div>


    </div>
  );
}


export default LandingPage;