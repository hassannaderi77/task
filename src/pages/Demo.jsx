
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiEdit3,
  FiLock,
  FiMessageSquare,
  FiPhone,
  FiSend,
} from "react-icons/fi";

function Demo() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const errorRef = useRef(null);

  useEffect(() => {
      if (error) {
        errorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [error]);

  // =====================================================
  // STEP 1 - Request OTP
  // =====================================================
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanPhone = phone.trim();

    // Validate phone
    if (!cleanPhone) {
      setError("لطفاً شماره موبایل خود را وارد کنید");
      return;
    }

    if (!/^09\d{9}$/.test(cleanPhone)) {
      setError("شماره موبایل معتبر نیست");
      return;
    }

    try {
      setLoading(true);

      console.log("========================================");
      console.log("📱 OTP REQUEST");
      console.log("========================================");
      console.log("Phone:", cleanPhone);
      console.log("Endpoint:", "/dev/api/auth/otpsms");

      const response = await fetch("/dev/api/auth/otpsms", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanPhone,
        }),
      });

      console.log("OTP response status:", response.status);

      // Try to read JSON response
      let data = null;

      try {
        data = await response.json();
      } catch {
        // Response may have no JSON body
      }

      console.log("OTP response:", data);

      if (!response.ok) {
        const message =
          data?.message ||
          data?.error ||
          "ارسال کد تایید ناموفق بود";

        throw new Error(message);
      }

      console.log("✅ OTP request successful");

      // Move to OTP step
      setStep(2);
      setCode("");
    } catch (error) {
      console.error("🔥 OTP request error:", error);

      setError(
        error?.message || "خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STEP 2 - Verify OTP
  // =====================================================
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanPhone = phone.trim();
    const cleanCode = code.trim();

    // Validate OTP
    if (!cleanCode) {
      setError("لطفاً کد تایید را وارد کنید");
      return;
    }

    if (!/^\d{4,6}$/.test(cleanCode)) {
      setError("کد تایید باید عددی باشد");
      return;
    }

    try {
      setLoading(true);

      console.log("========================================");
      console.log("🔐 OTP VERIFY");
      console.log("========================================");
      console.log("Phone:", cleanPhone);
      console.log("OTP:", cleanCode);
      console.log("Endpoint:", "/dev/api/auth/otpsms");

      const response = await fetch("/dev/api/auth/otpsms", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanPhone,
          otp: cleanCode,
          redirect: "/dev/panel",
        }),
      });

      console.log("Verify response status:", response.status);

      // Try to read JSON response
      let data = null;

      try {
        data = await response.json();
      } catch {
        // Response may have no JSON body
      }

      console.log("Verify response:", data);

      if (!response.ok) {
        const message =
          data?.message ||
          data?.error ||
          "کد تایید اشتباه است یا اعتبار آن تمام شده است";

        throw new Error(message);
      }

      console.log("✅ OTP verification successful");

      // Save authentication state
      login({
        phone: cleanPhone,
        role: "demo",
        isDemo: true,
      });

      // Go to setting page
      navigate("/setting");
    } catch (error) {
      console.error("🔥 OTP verification error:", error);

      setError(
        error?.message ||
          "خطا در تایید کد. لطفاً کد وارد شده را بررسی کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Change phone number
  // =====================================================
  const handleChangePhone = () => {
    if (loading) return;

    setStep(1);
    setCode("");
    setError("");
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
        sm:px-6
      "
    >
      {/* Background glows */}
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

      {/* Main */}
      <div
        className="
          relative mx-auto
          flex min-h-[80vh]
          max-w-md
          items-center
          justify-center
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
            sm:p-8
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

          {/* Decorative glow */}
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
                  flex h-20 w-20
                  items-center justify-center
                  rounded-3xl
                  border border-purple-400/20
                  bg-gradient-to-br
                  from-purple-500/20
                  via-purple-500/10
                  to-fuchsia-500/10
                  text-purple-200
                  shadow-xl
                  shadow-purple-950/30
                  transition-all duration-500
                  hover:scale-110
                  hover:-rotate-2
                "
              >
                <FiSend
                  className="
                    text-4xl
                    transition-transform
                    duration-500
                    group-hover:-translate-y-1
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
                  font-black
                  text-transparent
                "
              >
                نسخه دمو
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                برای ورود به نسخه دمو شماره موبایل خود را وارد کنید
              </p>

              {/* Step Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <span
                  className={`
                    h-2 rounded-full transition-all duration-500
                    ${
                      step === 1
                        ? "w-10 bg-gradient-to-r from-purple-500 to-fuchsia-500"
                        : "w-2 bg-purple-500/30"
                    }
                  `}
                />

                <span
                  className={`
                    h-2 rounded-full transition-all duration-500
                    ${
                      step === 2
                        ? "w-10 bg-gradient-to-r from-purple-500 to-fuchsia-500"
                        : "w-2 bg-purple-500/30"
                    }
                  `}
                />
              </div>
            </div>

            {/* =================================================
                STEP 1 - PHONE
            ================================================= */}
            {step === 1 && (
              <form onSubmit={handlePhoneSubmit}>
                <label className="font-medium mb-2 block text-sm font-medium text-purple-100">
                  شماره موبایل
                </label>

                <div className="relative">
                  <FiPhone
                    className="
                      pointer-events-none
                      absolute
                      right-4 top-1/2
                      -translate-y-1/2
                      text-lg
                      text-purple-300
                    "
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    disabled={loading}
                    className="
                      w-full
                      rounded-2xl
                      border border-purple-500/15
                      bg-white/[0.04]
                      px-12 py-4
                      text-left
                      text-white
                      placeholder:text-slate-600
                      outline-none
                      backdrop-blur-md
                      transition-all duration-300
                      focus:border-purple-400/60
                      focus:bg-purple-500/[0.06]
                      focus:ring-4
                      focus:ring-purple-500/15
                      focus:shadow-lg
                      focus:shadow-purple-950/20
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    dir="ltr"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div
                  ref={errorRef}
                    className="
                      mt-3
                      flex items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border border-red-500/15
                      bg-gradient-to-r
                      from-red-500/10
                      to-purple-500/[0.05]
                      p-3
                      text-center
                      text-sm
                      text-red-300
                    "
                  >
                    <FiMessageSquare className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group/button relative mt-5 w-full
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-purple-600
                    via-violet-600
                    to-fuchsia-600
                    py-4
                    font-medium
                    text-white
                    shadow-lg
                    shadow-purple-600/30
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:shadow-purple-500/40
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {/* Shine */}
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
                    {loading ? (
                      <>
                        <span
                          className="
                            h-5 w-5
                            animate-spin
                            rounded-full
                            border-2
                            border-white/30
                            border-t-white
                          "
                        />

                        <span>در حال ارسال...</span>
                      </>
                    ) : (
                      <>
                        <FiMessageSquare />

                        <span>دریافت کد تایید</span>

                        <FiArrowLeft
                          className="
                            transition-transform
                            duration-300
                            group-hover/button:-translate-x-1
                          "
                        />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}

            {/* =================================================
                STEP 2 - OTP
            ================================================= */}
            {step === 2 && (
              <form onSubmit={handleCodeSubmit}>
                {/* Phone info */}
                <div
                  className="
                    mb-5
                    rounded-2xl
                    border border-purple-500/15
                    bg-gradient-to-r
                    from-purple-500/[0.08]
                    to-fuchsia-500/[0.05]
                    p-4
                    text-center
                  "
                >
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <FiCheckCircle className="text-purple-300" />

                    <p className="text-sm text-slate-400">
                      کد تایید برای شماره
                    </p>
                  </div>

                  <p
                    className="
                      mt-2
                      font-medium
                      text-purple-200
                    "
                    dir="ltr"
                  >
                    {phone}
                  </p>
                </div>

                <label className="mb-2 block text-sm font-medium text-purple-100">
                  کد تایید
                </label>

                <div className="relative">
                  <FiLock
                    className="
                      pointer-events-none
                      absolute
                      right-4 top-1/2
                      -translate-y-1/2
                      text-lg
                      text-fuchsia-300
                    "
                  />

                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) =>
                      setCode(
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    placeholder="- - - - - -"
                    maxLength={6}
                    disabled={loading}
                    className="
                      w-full
                      rounded-2xl
                      border border-purple-500/15
                      bg-white/[0.04]
                      px-12 py-4
                      text-center
                      text-xl
                      tracking-[0.5em]
                      text-white
                      placeholder:text-slate-600
                      outline-none
                      backdrop-blur-md
                      transition-all duration-300
                      focus:border-fuchsia-400/60
                      focus:bg-purple-500/[0.06]
                      focus:ring-4
                      focus:ring-purple-500/15
                      focus:shadow-lg
                      focus:shadow-purple-950/20
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    dir="ltr"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div
                  ref={errorRef}
                    className="
                      mt-3
                      flex items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border border-red-500/15
                      bg-gradient-to-r
                      from-red-500/10
                      to-purple-500/[0.05]
                      p-3
                      text-center
                      text-sm
                      text-red-300
                    "
                  >
                    <FiMessageSquare className="shrink-0" />

                    <span>{error}</span>
                  </div>
                )}

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group/button relative mt-5 w-full
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-purple-600
                    via-violet-600
                    to-fuchsia-600
                    py-4
                    font-medium
                    text-white
                    shadow-lg
                    shadow-purple-600/30
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:shadow-purple-500/40
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {/* Shine */}
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
                    {loading ? (
                      <>
                        <span
                          className="
                            h-5 w-5
                            animate-spin
                            rounded-full
                            border-2
                            border-white/30
                            border-t-white
                          "
                        />

                        <span>در حال بررسی...</span>
                      </>
                    ) : (
                      <>
                        <FiSend />

                        <span>ورود به نسخه دمو</span>

                        <FiArrowLeft
                          className="
                            transition-transform
                            duration-300
                            group-hover/button:-translate-x-1
                          "
                        />
                      </>
                    )}
                  </span>
                </button>

                {/* Change phone */}
                <button
                  type="button"
                  onClick={handleChangePhone}
                  disabled={loading}
                  className="
                    mt-3
                    flex w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border border-transparent
                    py-3
                    text-sm
                    text-slate-400
                    transition-all duration-300
                    hover:border-purple-500/10
                    hover:bg-purple-500/[0.05]
                    hover:text-purple-200
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <FiEdit3 />

                  <span>تغییر شماره موبایل</span>
                </button>
              </form>
            )}
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

export default Demo;


