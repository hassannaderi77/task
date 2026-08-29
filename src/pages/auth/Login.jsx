import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiKey,
  FiLock,
  FiPhone,
  FiAlertCircle,
} from "react-icons/fi";

import { AuthContext } from "../../context/authContext";
import { loginUser } from "../../api/services/authService";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const errorRef = useRef(null)


  useEffect(() => {
        if (error) {
          errorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !code) {
      setError("شماره همراه و رمز عبور را وارد کنید");
      return;
    }

    try {
      setError("");

      const response = await loginUser({
        phone,
        password: code,
      });

      login(response.user);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "ورود ناموفق بود"
      );
    }
  };

  return (
    <div
      dir="rtl"
      className="
        relative min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-4 py-10
        text-white
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-40 -top-40
          h-96 w-96
          rounded-full
          bg-purple-600/20
          blur-[120px]
          animate-pulse
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-40 -left-40
          h-96 w-96
          rounded-full
          bg-fuchsia-600/15
          blur-[120px]
          animate-pulse
        "
      />

      {/* Center glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-72 w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/10
          blur-[100px]
        "
      />

      {/* Main container */}
      <div
        className="
          relative mx-auto
          flex min-h-[80vh]
          max-w-md
          items-center
        "
      >
        {/* Card */}
        <div
          className="
            group relative w-full
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
              -right-24 -top-24
              h-48 w-48
              rounded-full
              bg-purple-600/10
              blur-3xl
              transition-all duration-700
              group-hover:bg-purple-500/20
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-24 -left-24
              h-48 w-48
              rounded-full
              bg-fuchsia-600/10
              blur-3xl
            "
          />

          <div className="relative">
            {/* Header */}
            <div className="mb-8 text-center">
              <div
                className="
                  group/icon mx-auto mb-5
                  flex h-20 w-20
                  items-center justify-center
                  rounded-3xl
                  border border-purple-400/20
                  bg-gradient-to-br
                  from-purple-500/20
                  via-violet-500/10
                  to-fuchsia-500/10
                  text-purple-200
                  shadow-xl
                  shadow-purple-950/30
                  transition-all duration-500
                  hover:scale-110
                  hover:-rotate-3
                "
              >
                <FiLock
                  className="
                    text-4xl
                    transition-transform duration-500
                    group-hover/icon:scale-110
                  "
                />
              </div>

              <h1
                className="
                  bg-gradient-to-r
                  from-purple-200
                  via-fuchsia-300
                  to-purple-300
                  bg-clip-text
                  text-3xl
                  font-medium
                  text-transparent
                  sm:text-4xl
                "
              >
                ورود به حساب
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                شماره همراه و کد تایید را وارد کنید
              </p>

              <div
                className="
                  mx-auto mt-5
                  h-1 w-16
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  to-fuchsia-500
                "
              />
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4"
            >
              {/* Phone */}
              <div>
                <label
                  className="
                    mb-2 block
                    text-sm
                    text-purple-100
                    font-medium
                  "
                >
                  شماره همراه
                </label>

                <div className="relative">
                  <span
                    className="
                      pointer-events-none
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-purple-300
                    "
                  >
                    <FiPhone className="text-lg" />
                  </span>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="شماره همراه"
                    dir="ltr"
                    className="
                      w-full
                      rounded-2xl
                      border border-purple-500/15
                      bg-white/[0.04]
                      px-12 py-4
                      text-center
                      text-sm
                      text-white
                      placeholder:text-slate-500
                      outline-none
                      backdrop-blur-md
                      transition-all duration-300
                      focus:border-purple-400/60
                      focus:bg-purple-500/[0.06]
                      focus:ring-4
                      focus:ring-purple-500/15
                      focus:shadow-lg
                      focus:shadow-purple-950/20
                    "
                  />
                </div>
              </div>

              {/* Password / Code */}
              <div>
                <label
                  className="
                    mb-2 block
                    text-sm
                    text-purple-100
                    font-medium
                  "
                >
                  رمز ورود
                </label>

                <div className="relative">
                  <span
                    className="
                      pointer-events-none
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-fuchsia-300
                    "
                  >
                    <FiKey className="text-lg" />
                  </span>

                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="رمز ورود"
                    dir="ltr"
                    className="
                      w-full
                      rounded-2xl
                      border border-purple-500/15
                      bg-white/[0.04]
                      px-12 py-4
                      text-center
                      text-sm
                      text-white
                      placeholder:text-slate-500
                      outline-none
                      backdrop-blur-md
                      transition-all duration-300
                      focus:border-fuchsia-400/60
                      focus:bg-purple-500/[0.06]
                      focus:ring-4
                      focus:ring-purple-500/15
                      focus:shadow-lg
                      focus:shadow-purple-950/20
                    "
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                ref={errorRef}
                  className="
                    flex items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border border-red-500/20
                    bg-gradient-to-r
                    from-red-500/10
                    to-purple-500/[0.04]
                    px-4 py-3
                    text-center
                    text-sm
                    font-medium
                    text-red-300
                    shadow-lg
                    shadow-red-950/10
                  "
                >
                  <FiAlertCircle className="shrink-0 text-base" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="
                  group/button relative
                  mt-3
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-r
                  from-purple-600
                  via-violet-600
                  to-fuchsia-600
                  px-6 py-4
                  font-medium
                  text-white
                  shadow-xl
                  shadow-purple-600/30
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-2xl
                  hover:shadow-purple-500/40
                  active:scale-[0.98]
                "
              >
                {/* Shine animation */}
                <span
                  className="
                    absolute inset-y-0 -left-full
                    w-1/2
                    skew-x-[-20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-all duration-700
                    group-hover/button:left-[130%]
                  "
                />

                <span
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  

                  <span>ورود</span>

                  <FiArrowLeft
                    className="
                      transition-transform duration-300
                      group-hover/button:-translate-x-1
                    "
                  />
                </span>
              </button>
            </form>

            {/* Register */}
            <div
              className="
                mt-7
                text-center
                text-sm
                text-slate-400
              "
            >
              حساب کاربری ندارید؟{" "}

              <Link
                to="/register"
                className="
                  font-medium
                  text-transparent
                  bg-gradient-to-r
                  from-purple-300
                  to-fuchsia-300
                  bg-clip-text
                  transition-all duration-300
                  hover:from-purple-200
                  hover:to-fuchsia-200
                "
              >
                ثبت نام کنید
              </Link>
            </div>
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
    </div>
  );
}

export default Login;