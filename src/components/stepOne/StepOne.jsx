import React from "react";
import { FiArrowLeft, FiMessageSquare, FiPhone } from "react-icons/fi";

function StepOne({
    handlePhoneSubmit,
    step,
phone,
setPhone,
loading,
error,
errorRef,

}) {
  return (
    <div>
      {step === 1 && (
        <form onSubmit={handlePhoneSubmit}>
          <label className="mb-2 block text-sm font-medium text-purple-100">
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
              dir="ltr"
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

                  <FiArrowLeft />
                </>
              )}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}

export default StepOne;
