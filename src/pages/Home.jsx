
import { useNavigate } from "react-router-dom";
import {
  FiSend,
  FiImage,
  FiArrowLeft,
  FiStar,
} from "react-icons/fi";
import GhostFibers from "../components/ui/GhostFibers/GhostFibers";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="
        relative min-h-screen
        overflow-hidden
        bg-linear-to-br
        from-[#08040f]
        via-[#160d2b]
        to-[#0d0718]
        px-4 py-6
        text-white
        sm:px-6 sm:py-10
      "
    >
      <GhostFibers
  color="#8b5cf6"
  amplitude={0.8}
  distance={0.6}
  enableMouseInteraction={true}
/>
      {/* Background glows */}
      <div
        className="
          pointer-events-none absolute
          -right-24 -top-24
          h-56 w-56
          rounded-full
          bg-purple-600/20
          blur-[90px]
          sm:-right-32 sm:-top-32
          sm:h-80 sm:w-80
          sm:blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24 -left-24
          h-56 w-56
          rounded-full
          bg-fuchsia-600/15
          blur-[90px]
          sm:-bottom-32 sm:-left-32
          sm:h-80 sm:w-80
          sm:blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          left-1/2 top-[45%]
          h-64 w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/10
          blur-[100px]
          sm:h-96 sm:w-96
          sm:blur-[130px]
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* Demo Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/demo")}
            className="
              group relative
              overflow-hidden
              rounded-xl
              bg-linear-to-r
              from-purple-600
              via-violet-600
              to-fuchsia-600
              px-5 py-2.5
              text-sm
              font-medium
              text-white
              shadow-lg
              shadow-purple-600/25
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-purple-500/30
              active:scale-95
              sm:rounded-2xl
              sm:px-8 sm:py-3.5
              sm:text-base
            "
          >
            {/* Shine */}
            <span
              className="
                absolute inset-y-0 -left-full
                w-1/2
                skew-x-[-20deg]
                bg-linear-to-r
                from-transparent
                via-white/20
                to-transparent
                transition-all duration-700
                group-hover:left-[130%]
              "
            />

            <span className="relative flex items-center gap-2">
              <FiSend
                className="
                  text-base
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:rotate-12
                  sm:text-lg
                "
              />

              <span>نسخه دمو</span>
            </span>
          </button>
        </div>

        {/* Hero */}
        <section
          className="
            mx-auto
            mt-12
            max-w-4xl
            text-center
            sm:mt-20
          "
        >
          {/* AI Icon */}
          <div
            className="
              group mx-auto
              mb-5
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-purple-400/20
              bg-linear-to-br
              from-purple-500/20
              via-violet-500/10
              to-fuchsia-500/10
              text-purple-200
              shadow-xl
              shadow-purple-950/40
              transition-all duration-500
              hover:scale-110
              hover:-rotate-2
              sm:mb-7
              sm:h-24 sm:w-24
              sm:rounded-4xl
            "
          >
            <FiImage
              className="
                text-3xl
                transition-transform duration-500
                group-hover:scale-110
                sm:text-5xl
              "
            />
          </div>

          {/* Badge */}
          <div
            className="
              mx-auto mb-4
              inline-flex
              max-w-[90%]
              items-center
              justify-center
              gap-1.5
              rounded-full
              border border-purple-500/20
              bg-purple-500/6
              px-3 py-1.5
              text-[10px]
              font-medium
              text-purple-300
              shadow-lg
              shadow-purple-950/20
              sm:mb-5
              sm:gap-2
              sm:px-4 sm:py-2
              sm:text-xs
            "
          >
            <FiStar className="shrink-0 text-xs sm:text-sm" />

            <span>
              قدرت هوش مصنوعی برای تصاویر شما
            </span>
          </div>

          {/* Main title */}
          <h1
            className="
              bg-linear-to-r
              from-purple-200
              via-fuchsia-300
              to-purple-300
              bg-clip-text
              text-3xl
              font-medium
              leading-[1.65]
              text-transparent
              sm:text-5xl
              sm:leading-normal
              md:text-6xl
            "
          >
            تصاویرت را با هوش مصنوعی

            <br />

            <span
              className="
                bg-linear-to-r
                from-fuchsia-300
                via-purple-300
                to-violet-200
                bg-clip-text
                text-transparent
              "
            >
              آن‌طور که می‌خواهی بساز
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-85
              text-xs
              leading-7
              text-slate-400
              sm:mt-6
              sm:max-w-2xl
              sm:text-base
              sm:leading-8
            "
          >
            عکس‌هایت را به چیزی که در ذهنت داری تبدیل کن.
            پس‌زمینه را تغییر بده، کیفیت را افزایش بده و
            جزئیات تصویر را با کمک هوش مصنوعی ویرایش کن.
          </p>

          {/* CTA */}
          <div
            className="
              mt-7
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:mt-9
              sm:flex-row
            "
          >
            {/* Login */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                group relative
                flex
                w-full
                max-w-70
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-xl
                bg-linear-to-r
                from-purple-600
                via-violet-600
                to-fuchsia-600
                px-6 py-3.5
                text-sm
                font-medium
                text-white
                shadow-xl
                shadow-purple-600/30
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-purple-500/40
                active:scale-95
                sm:w-auto
                sm:max-w-none
                sm:rounded-2xl
                sm:px-8 sm:py-4
                sm:text-base
              "
            >
              {/* Shine */}
              <span
                className="
                  absolute inset-y-0 -left-full
                  w-1/2
                  skew-x-[-20deg]
                  bg-linear-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  transition-all duration-700
                  group-hover:left-[130%]
                "
              />

              <span className="relative">
                شروع کنید
              </span>

              <FiArrowLeft
                className="
                  relative
                  text-base
                  transition-transform duration-300
                  group-hover:-translate-x-1
                  sm:text-lg
                "
              />
            </button>

            {/* Register */}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="
                flex
                w-full
                max-w-70
                items-center
                justify-center
                rounded-xl
                border
                border-purple-500/20
                bg-white/3
                px-6 py-3.5
                text-sm
                font-medium
                text-purple-200
                backdrop-blur-md
                transition-all duration-300
                hover:-translate-y-1
                hover:border-purple-400/40
                hover:bg-purple-500/[0.07]
                sm:w-auto
                sm:max-w-none
                sm:rounded-2xl
                sm:px-8 sm:py-4
                sm:text-base
              "
            >
              ساخت حساب رایگان
            </button>
          </div>
        </section>

        {/* Features */}
        <section
          className="
            mx-auto
            mt-14
            grid
            max-w-4xl
            grid-cols-1
            gap-3
            sm:mt-20
            sm:grid-cols-3
            sm:gap-4
          "
        >
          {[
            {
              title: "ویرایش هوشمند",
              description:
                "تغییر و اصلاح بخش‌های مختلف تصویر با کمک AI",
            },
            {
              title: "بهبود کیفیت",
              description:
                "افزایش وضوح و کیفیت تصاویر با چند کلیک",
            },
            {
              title: "ساده و سریع",
              description:
                "بدون نیاز به مهارت حرفه‌ای در ویرایش تصاویر",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                group
                rounded-xl
                border
                border-purple-500/10
                bg-white/2.5
                p-4
                text-center
                backdrop-blur-md
                transition-all duration-300
                hover:-translate-y-1
                hover:border-purple-400/30
                hover:bg-purple-500/5
                sm:rounded-2xl
                sm:p-5
              "
            >
              <h3
                className="
                  text-xs
                  font-medium
                  text-purple-200
                  transition-colors
                  group-hover:text-purple-100
                  sm:text-sm
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-1.5
                  text-[10px]
                  leading-6
                  text-slate-500
                  sm:mt-2
                  sm:text-xs
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Home;

