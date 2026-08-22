import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!phone) {
      setError("شماره همراه را وارد کنید");
      return;
    }

    if (code !== "123456") {
      setError("کد تایید صحیح نمی‌باشد");
      return;
    }

    const user = {
      name: "Hassan",
      family: "Naderi",
      phone,
      email: "hassan@example.com",
      role: "user",
    };

    login(user);

    navigate("/dashboard");
  };

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-blue-950
        px-4
        py-10
        text-white
      "
    >
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div
          className="
            w-full
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
              🔐
            </div>

            <h1 className="text-3xl font-black sm:text-4xl">
              ورود به حساب
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              شماره همراه و کد تایید را وارد کنید
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
          >
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره همراه"
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3.5
                text-sm
                text-white
                placeholder:text-slate-400
                outline-none
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-500/20
              "
            />

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              placeholder="کد تایید"
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3.5
                text-sm
                text-white
                placeholder:text-slate-400
                outline-none
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-500/20
              "
            />

            {error && (
              <p
                className="
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-400
                "
              >
                {error}
              </p>
            )}

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
                hover:scale-[1.02]
                active:scale-95
              "
            >
              ورود
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            حساب کاربری ندارید؟{" "}

            <Link
              to="/register"
              className="font-bold text-blue-400 hover:text-blue-300"
            >
              ثبت نام کنید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;