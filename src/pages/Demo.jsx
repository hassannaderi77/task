import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { FiSend } from "react-icons/fi";
import StepOne from "../components/stepOne/StepOne";
import StepTwo from "../components/twoStep/StepTwo";

function Demo() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [otpStatus, setOtpStatus] = useState("idle");
  // idle | loading | success | error

  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef([]);
  const errorRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // =====================================================
  // Scroll to error
  // =====================================================

  useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  // =====================================================
  // Resend countdown
  // =====================================================

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // =====================================================
  // STEP 1 - Request OTP
  // =====================================================

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const cleanPhone = phone.trim();

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

      let data = null;

      try {
        data = await response.json();
      } catch {
        // Response may have no JSON body
      }

      console.log("OTP response:", data);

      if (!response.ok) {
        const message =
          data?.message || data?.error || "ارسال کد تایید ناموفق بود";

        throw new Error(message);
      }

      console.log("✅ OTP request successful");

      setStep(2);
      setCode(["", "", "", ""]);
      setOtpStatus("idle");

      // شروع تایمر ارسال مجدد
      setResendTimer(60);

      // فوکوس روی اولین باکس
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      console.error("🔥 OTP request error:", error);

      setError(
        error?.message || "خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // OTP input change
  // =====================================================

  const handleCodeChange = (index, value) => {
    // فقط عدد
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) {
      const newCode = [...code];
      newCode[index] = "";

      setCode(newCode);
      setOtpStatus("idle");

      return;
    }

    const digit = numericValue.slice(-1);

    const newCode = [...code];
    newCode[index] = digit;

    setCode(newCode);
    setError("");
    setOtpStatus("idle");

    // رفتن به باکس بعدی
    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =====================================================
  // OTP keyboard handling
  // =====================================================

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";

        setCode(newCode);
        setOtpStatus("idle");

        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const newCode = [...code];
        newCode[index - 1] = "";

        setCode(newCode);
        setOtpStatus("idle");
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =====================================================
  // STEP 2 - Verify OTP
  // =====================================================

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const cleanPhone = phone.trim();
    const cleanCode = code.join("");

    if (cleanCode.length !== 4) {
      setError("لطفاً کد تایید ۴ رقمی را کامل وارد کنید");
      setOtpStatus("error");
      return;
    }

    try {
      setLoading(true);
      setOtpStatus("loading");

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

      // سبز شدن باکس‌ها
      setOtpStatus("success");

      // کمی مکث برای نمایش موفقیت
      setTimeout(() => {
        login({
          phone: cleanPhone,
          role: "demo",
          isDemo: true,
        });

        navigate("/setting");
      }, 600);
    } catch (error) {
      console.error("🔥 OTP verification error:", error);

      setOtpStatus("error");

      setError(
        error?.message || "خطا در تایید کد. لطفاً کد وارد شده را بررسی کنید.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Resend OTP
  // =====================================================

  const handleResendCode = async () => {
    if (resendTimer > 0 || resendLoading || loading) {
      return;
    }

    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setError("شماره موبایل وارد نشده است");
      return;
    }

    try {
      setResendLoading(true);
      setError("");
      setOtpStatus("idle");

      console.log("========================================");
      console.log("🔄 RESEND OTP");
      console.log("========================================");
      console.log("Phone:", cleanPhone);

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

      let data = null;

      try {
        data = await response.json();
      } catch {
        // Response may have no JSON body
      }

      if (!response.ok) {
        const message =
          data?.message || data?.error || "ارسال مجدد کد تایید ناموفق بود";

        throw new Error(message);
      }

      console.log("✅ OTP resent successfully");

      // پاک کردن کد قبلی
      setCode(["", "", "", ""]);

      // شروع مجدد تایمر
      setResendTimer(60);

      // فوکوس روی اولین input
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      console.error("🔥 Resend OTP error:", error);

      setError(error?.message || "ارسال مجدد کد تایید با مشکل مواجه شد");
    } finally {
      setResendLoading(false);
    }
  };

  // =====================================================
  // Change phone number
  // =====================================================

  const handleChangePhone = () => {
    if (loading || resendLoading) return;

    setStep(1);
    setCode(["", "", "", ""]);
    setError("");
    setOtpStatus("idle");
    setResendTimer(0);
  };

  // =====================================================
  // OTP box class
  // =====================================================

  const getOtpBoxClass = () => {
    let base = `
      h-16
      w-14
      rounded-2xl
      border
      bg-white/[0.04]
      text-center
      text-2xl
      font-bold
      text-white
      outline-none
      backdrop-blur-md
      transition-all
      duration-300
      sm:h-[68px]
      sm:w-[60px]
    `;

    if (otpStatus === "success") {
      return `
        ${base}
        border-emerald-400/80
        bg-emerald-500/10
        text-emerald-300
        shadow-lg
        shadow-emerald-500/20
      `;
    }

    if (otpStatus === "error") {
      return `
        ${base}
        border-red-400/70
        bg-red-500/10
        text-red-300
        animate-[shake_0.4s_ease-in-out]
      `;
    }

    if (otpStatus === "loading") {
      return `
        ${base}
        border-purple-400/60
        bg-purple-500/[0.08]
        text-purple-200
        animate-pulse
        shadow-lg
        shadow-purple-500/20
      `;
    }

    return `
      ${base}
      border-purple-500/20
      focus:border-fuchsia-400/70
      focus:bg-purple-500/[0.08]
      focus:ring-4
      focus:ring-purple-500/15
      focus:shadow-lg
      focus:shadow-purple-950/30
    `;
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
                  font-medium
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
                STEP 1
            ================================================= */}

            <StepOne
              handlePhoneSubmit={handlePhoneSubmit}
              step={step}
              phone={phone}
              setPhone={setPhone}
              loading={loading}
              error={error}
              errorRef={errorRef}
            />

            {/* =================================================
                STEP 2
            ================================================= */}

            <StepTwo
              step={step}
              handleCodeSubmit={handleCodeSubmit}
              phone={phone}
              code={code}
              inputRefs={inputRefs}
              loading={loading}
              handleCodeChange={handleCodeChange}
              handleCodeKeyDown={handleCodeKeyDown}
              getOtpBoxClass={getOtpBoxClass}
              otpStatus={otpStatus}
              error={error}
              errorRef={errorRef}
              resendTimer={resendTimer}
              resendLoading={resendLoading}
              handleResendCode={handleResendCode}
              handleChangePhone={handleChangePhone}
            />
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
