import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login() {
  const { loginInfo, setLoginInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickHandler = (e) => {
    e.preventDefault();

    if (
      loginInfo.name &&
      loginInfo.family &&
      loginInfo.phone &&
      loginInfo.email
    ) {
      navigate("/dashboard");
    }
  };


  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-slate-400 outline-none backdrop-blur-md transition duration-300 focus:border-blue-400 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20 sm:text-base";


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
        max-w-md 
        rounded-3xl 
        border 
        border-white/10 
        bg-white/5 
        p-6 
        shadow-2xl
        backdrop-blur-xl
        sm:p-10
        "
      >


        <div className="mb-8 text-center">

          <div
            className="
            mx-auto 
            mb-4 
            flex 
            h-16 
            w-16 
            items-center 
            justify-center 
            rounded-2xl 
            bg-blue-600/20
            text-3xl
            "
          >
            👤
          </div>


          <h1 className="text-3xl font-black text-white sm:text-4xl">
            ایجاد حساب کاربری
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            اطلاعات خود را برای ثبت نام وارد کنید
          </p>

        </div>



        <form
          onSubmit={clickHandler}
          className="flex flex-col gap-4"
        >


          <input
            type="text"
            name="name"
            value={loginInfo.name}
            onChange={handleChange}
            placeholder="نام"
            className={inputClass}
          />


          <input
            type="text"
            name="family"
            value={loginInfo.family}
            onChange={handleChange}
            placeholder="نام خانوادگی"
            className={inputClass}
          />


          <input
            type="text"
            name="phone"
            value={loginInfo.phone}
            onChange={handleChange}
            placeholder="شماره همراه"
            className={inputClass}
          />


          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="ایمیل"
            className={inputClass}
          />



          <button
            type="submit"
            className="
            mt-4
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            px-6
            py-3.5
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/30
            transition
            duration-300
            hover:scale-[1.02]
            hover:shadow-blue-500/50
            active:scale-95
            "
          >
            ثبت نام
          </button>


        </form>



        <div className="my-6 flex items-center gap-3">

          <div className="h-px flex-1 bg-white/10"></div>

          <span className="text-xs text-slate-500">
            یا
          </span>

          <div className="h-px flex-1 bg-white/10"></div>

        </div>



        <Link
          to="/home"
          className="
          block
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-6
          py-3.5
          text-center
          font-semibold
          t

ext-white
          transition
          hover:bg-white/10
          active:scale-95
          "
        >
          ورود به حساب
        </Link>


      </div>


    </div>
  );
}

export default Login;