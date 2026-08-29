import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/services/authService";

function Register() {
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    family: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickHandler = async (e) => {
    e.preventDefault();

    if (
      !loginInfo.name ||
      !loginInfo.family ||
      !loginInfo.phone ||
      !loginInfo.email ||
      !loginInfo.password
    ) {
      return;
    }

    try {
      await registerUser(loginInfo);

      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-purple-500/15 bg-white/[0.04] px-5 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none backdrop-blur-md transition-all duration-300 focus:border-purple-400/60 focus:bg-purple-500/[0.06] focus:ring-4 focus:ring-purple-500/15 focus:shadow-lg focus:shadow-purple-950/20 sm:text-base";

  return (
    <div
      dir="rtl"
      className="
        relative flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-gradient-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-4 py-10
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-32 -top-32
          h-80 w-80
          rounded-full
          bg-purple-600/20
          blur-[110px]
          animate-pulse
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 -left-32
          h-80 w-80
          rounded-full
          bg-fuchsia-600/15
          blur-[110px]
          animate-pulse
        "
      />

      {/* Register Card */}
      <div
        className="
          group relative w-full max-w-md
          overflow-hidden
          rounded-[2rem]
          border border-purple-500/20
          bg-gradient-to-br
          from-[#160d2b]/95
          via-[#1d1038]/90
          to-[#0d0718]/95
          p-6
          shadow-2xl
          shadow-purple-950/40
          backdrop-blur-2xl
          sm:p-10
        "
      >
        {/* Top gradient */}
        <div
          className="
            absolute left-0 right-0 top-0
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-purple-500
            to-fuchsia-500
          "
        />

        {/* Card glow */}
        <div
          className="
            pointer-events-none absolute
            -right-20 -top-20
            h-40 w-40
            rounded-full
            bg-purple-600/10
            blur-3xl
            transition-all duration-700
            group-hover:bg-purple-500/20
          "
        />

        <div className="relative">
          {/* Header */}
          <div className="mb-8 text-center">
            <div
              className="
                mx-auto mb-5
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-purple-500
                to-fuchsia-600
                text-3xl
                shadow-xl
                shadow-purple-500/25
                transition-all duration-500
                hover:scale-110
                hover:rotate-3
              "
            >
              👤
            </div>

            <h1
              className="
                text-3xl font-black
                text-transparent
                bg-gradient-to-r
                from-purple-200
                via-fuchsia-300
                to-purple-300
                bg-clip-text
                sm:text-4xl
              "
            >
              ایجاد حساب کاربری
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              اطلاعات خود را برای ثبت نام وارد کنید
            </p>
          </div>

          {/* Form */}
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

            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="رمز عبور"
              className={inputClass}
            />

            <button
              type="submit"
              className="
                relative mt-4
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-purple-600
                via-violet-600
                to-fuchsia-600
                px-6 py-3.5
                font-medium
                text-white
                shadow-lg
                shadow-purple-600/30
                transition-all duration-300

                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-purple-500/40
                active:scale-95
              "
            >
              <span
                className="
                  absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/15
                  to-transparent
                  transition-transform duration-700
                  hover:translate-x-full
                "
              />

              <span className="relative">
                ثبت نام
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/20" />

            <span className="text-xs text-slate-500">
              یا
            </span>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/20" />
          </div>

          {/* Login */}
          <Link
            to="/login"
            className="
              block
              rounded-2xl
              border border-purple-500/20
              bg-gradient-to-r
              from-purple-500/[0.06]
              to-fuchsia-500/[0.04]
              px-6 py-3.5
              text-center
              font-semibold
              text-purple-200
              transition-all duration-300

              hover:border-purple-400/40
              hover:bg-purple-500/[0.10]
              hover:text-white
              hover:shadow-lg
              hover:shadow-purple-950/20

              active:scale-95
            "
          >
            ورود به حساب
          </Link>
        </div>

        {/* Bottom gradient */}
        <div
          className="
            absolute bottom-0 left-1/2
            h-[2px] w-1/3
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-transparent
            via-fuchsia-500
            to-transparent
          "
        />
      </div>
    </div>
  );
}

export default Register;