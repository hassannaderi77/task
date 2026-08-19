import React from "react";

function AboutUs() {

  return (

    <div
      dir="rtl"
      className="
      min-h-screen
      bg-slate-950
      px-5
      py-12
      text-white
      "
    >


      <div
        className="
        mx-auto
        max-w-4xl
        "
      >


        <div
          className="
          rounded-3xl
          border border-slate-800
          bg-gradient-to-br
          from-slate-900
          to-slate-950
          p-8
          shadow-2xl
          "
        >


          <h1
            className="
            text-center
            text-4xl
            font-black
            sm:text-5xl
            "
          >
            درباره ما
          </h1>



          <p
            className="
            mt-6
            text-center
            leading-8
            text-slate-400
            "
          >
            ما در Modernio تلاش می‌کنیم تجربه‌ای ساده،
            سریع و حرفه‌ای برای مدیریت درخواست‌ها و خدمات
            کاربران ایجاد کنیم.
          </p>



          <div
            className="
            mt-10
            grid
            gap-5
            sm:grid-cols-3
            "
          >


            <div
              className="
              rounded-2xl
              border border-slate-800
              bg-slate-800/50
              p-5
              text-center
              "
            >
              <span className="text-4xl">
                🚀
              </span>

              <h3 className="mt-3 font-bold">
                سریع
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                پردازش سریع درخواست‌ها
              </p>

            </div>



            <div
              className="
              rounded-2xl
              border border-slate-800
              bg-slate-800/50
              p-5
              text-center
              "
            >

              <span className="text-4xl">
                🔒
              </span>

              <h3 className="mt-3 font-bold">
                امن
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                حفظ اطلاعات کاربران
              </p>

            </div>



            <div
              className="
              rounded-2xl
              border border-slate-800
              bg-slate-800/50
              p-5
              text-center
              "
            >

              <span className="text-4xl">
                ⭐
              </span>

              <h3 className="mt-3 font-bold">
                حرفه‌ای
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                تجربه کاربری بهتر
              </p>

            </div>


          </div>


        </div>


      </div>


    </div>

  );
}


export default AboutUs;