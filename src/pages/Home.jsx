import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
      <div className="mb-8 flex justify-center">
        <button
          onClick={() => navigate("/demo")}
          className="
      rounded-2xl
      bg-blue-600
      px-8
      py-3
      font-bold
      text-white
      shadow-lg
      shadow-blue-600/20
      transition
      hover:bg-blue-500
      active:scale-95
    "
        >
           نسخه دمو
        </button>
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black sm:text-5xl">محصولات</h1>

          <p className="mt-3 text-slate-400">محصولات موجود در فروشگاه</p>
        </div>

        <div
          className="
            flex
            min-h-[300px]
            items-center
            justify-center
            rounded-3xl
            border
            border-white/10
            bg-white/5
            shadow-2xl
            backdrop-blur-xl
          "
        >
          <div className="text-center">
            <div className="mb-4 text-5xl">📦</div>

            <h2 className="text-2xl font-bold text-white">
              محصولی موجود نمی‌باشد
            </h2>

            <p className="mt-3 text-slate-400">
              در حال حاضر محصولی برای نمایش وجود ندارد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
