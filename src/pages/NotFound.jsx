import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      dir="rtl"
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-950
        px-6
        text-white
      "
    >
      <div className="w-full max-w-2xl text-center">

        {/* 404 */}
        <div className="relative mb-8">
          <div
            className="
              absolute
              inset-0
              blur-3xl
              bg-blue-600/10
            "
          />

          <h1
            className="
              relative
              text-[120px]
              font-black
              leading-none
              tracking-tighter
              text-blue-500
              sm:text-[180px]
            "
          >
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black sm:text-3xl">
          صفحه موردنظر پیدا نشد
        </h2>

        

        {/* Button */}
        <Link
          to="/"
          className="
            mt-8
            inline-flex
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            px-8
            py-3.5
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/20
            transition-all
            hover:bg-blue-500
            hover:shadow-blue-500/30
            active:scale-95
          "
        >
          بازگشت به صفحه اصلی
        </Link>

      </div>
    </div>
  );
}

export default NotFound;