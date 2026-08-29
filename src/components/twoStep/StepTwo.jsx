import React from "react";
import { FiArrowLeft, FiCheckCircle, FiEdit3, FiMessageSquare, FiRefreshCw, FiSend } from "react-icons/fi";

function StepTwo({
    step,
    handleCodeSubmit,
phone,
code,
inputRefs,
loading,
handleCodeChange,
handleCodeKeyDown,
getOtpBoxClass,
otpStatus,
error,
errorRef,
resendTimer,
resendLoading,
handleResendCode,
handleChangePhone,
}) {
  return (
    <div>
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

              <p className="text-sm text-slate-400">کد تایید برای شماره</p>
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

          <label className="mb-3 block text-sm font-medium text-purple-100">
            کد تایید
          </label>

          {/* OTP Boxes */}

          <div
            dir="ltr"
            className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    sm:gap-3
                  "
          >
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                disabled={loading || resendLoading}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                className={getOtpBoxClass()}
              />
            ))}
          </div>

          {/* OTP status */}

          {otpStatus === "loading" && (
            <p className="mt-4 text-center text-sm text-purple-300">
              در حال بررسی کد...
            </p>
          )}

          {otpStatus === "success" && (
            <p className="mt-4 text-center text-sm text-emerald-300">
              کد تایید شد ✓
            </p>
          )}

          {/* Error */}

          {error && (
            <div
              ref={errorRef}
              className="
                      mt-4
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
            disabled={loading || resendLoading}
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

                  <FiArrowLeft />
                </>
              )}
            </span>
          </button>

          {/* Resend */}

          <div className="mt-5 text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-slate-500">
                ارسال مجدد کد تا{" "}
                <span className="font-bold text-purple-300">{resendTimer}</span>{" "}
                ثانیه دیگر
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendLoading || loading}
                className="
                        mx-auto
                        flex items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-4 py-2
                        text-sm
                        text-purple-300
                        transition-all
                        duration-300
                        hover:bg-purple-500/[0.06]
                        hover:text-purple-200
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
              >
                <FiRefreshCw className={resendLoading ? "animate-spin" : ""} />

                <span>
                  {resendLoading
                    ? "در حال ارسال..."
                    : "کد را دریافت نکردید؟ ارسال مجدد"}
                </span>
              </button>
            )}
          </div>

          {/* Change phone */}

          <button
            type="button"
            onClick={handleChangePhone}
            disabled={loading || resendLoading}
            className="
                    mt-2
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
  );
}

export default StepTwo;
