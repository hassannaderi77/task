
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Demo() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const { pass, login } = useAuth();
  const navigate = useNavigate();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!phone.trim()) {
      setError("لطفاً شماره موبایل خود را وارد کنید");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل معتبر نیست");
      return;
    }

    setStep(2);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!code.trim()) {
      setError("لطفاً کد تایید را وارد کنید");
      return;
    }

    if (code !== pass) {
      setError("کد تایید اشتباه است");
      return;
    }

    console.log("✅ Demo login successful:", {
      phone,
      role: "demo",
    });

    login({
      phone,
      role: "demo",
      isDemo: true,
    });

    navigate("/setting");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6"
    >
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
          <div className="mb-8 text-center">
            <div className="mb-4 text-5xl">🚀</div>

            <h1 className="text-3xl font-black">
              نسخه دمو
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              برای ورود به نسخه دمو شماره موبایل خود را وارد کنید
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handlePhoneSubmit}>
              <label className="mb-2 block text-sm font-bold text-slate-300">
                شماره موبایل
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09123456789"
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-left outline-none transition focus:border-blue-500"
                dir="ltr"
              />

              {error && (
                <p className="mt-3 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl bg-blue-600 py-4 font-bold transition hover:bg-blue-500 active:scale-95"
              >
                دریافت کد تایید
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleCodeSubmit}>
              <div className="mb-5 rounded-2xl bg-slate-800 p-4 text-center">
                <p className="text-sm text-slate-400">
                  کد تایید برای شماره
                </p>

                <p className="mt-2 font-bold" dir="ltr">
                  {phone}
                </p>
              </div>

              <label className="mb-2 block text-sm font-bold text-slate-300">
                کد تایید
              </label>

              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="- - - - - -"
                maxLength={6}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-center text-xl tracking-[0.5em] outline-none transition focus:border-blue-500"
                dir="ltr"
              />

              {error && (
                <p className="mt-3 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl bg-blue-600 py-4 font-bold transition hover:bg-blue-500 active:scale-95"
              >
                ورود به نسخه دمو
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setCode("");
                  setError("");
                }}
                className="mt-3 w-full rounded-2xl py-3 text-sm text-slate-400 transition hover:text-white"
              >
                تغییر شماره موبایل
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Demo;

