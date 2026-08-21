import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

import { useAuth } from "../hooks/useAuth";

import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";

function Dashboard() {
  const { user, logout } = useAuth();
  console.log("Dashboard user:", user);

  const navigate = useNavigate();

  const {
  data: users,
  isLoading,
  isError,
  error,
} = useUsers();

if (isLoading) {
  return <Loading text="در حال دریافت کاربران..." />;
}

if (isError) {
  return <ErrorMessage message={error.message} />;
}

if (!users || users.length === 0) {
  return <EmptyState message="کاربری پیدا نشد." />;
}

  const infoItems = [
    {
      title: "نام",
      value: user.name,
      icon: "👤",
    },
    {
      title: "نام خانوادگی",
      value: user.family,
      icon: "📝",
    },
    {
      title: "شماره همراه",
      value: user.phone,
      icon: "📱",
    },
    {
      title: "ایمیل",
      value: user.email,
      icon: "✉️",
    },
  ];

  console.log("Users:", users);

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

      {isLoading && (
  <p className="mb-4 text-center text-slate-400">
    در حال دریافت کاربران...
  </p>
)}

{isError && (
  <p className="mb-4 text-center text-red-400">
    خطا در دریافت کاربران: {error.message}
  </p>
)}
      <div className="mx-auto max-w-4xl">
        {/* Header /}
        <div className="mb-10 text-center">

          <div
            className="
            mx-auto
            mb-5
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-blue-600/20
            text-4xl
            "
          >
            👨‍💻
          </div>


          <h1
            className="
            text-4xl
            font-black
            sm:text-5xl
            "
          >
            Dashboard
          </h1>


          <p className="mt-3 text-slate-400">
            مدیریت اطلاعات حساب کاربری
          </p>


        </div>



        {/ User Card */}
        <div
          className="
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
          <h2
            className="
            mb-8
            text-center
            text-2xl
            font-bold
            text-blue-400
            "
          >
            اطلاعات کاربر
          </h2>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="rounded-xl bg-red-500 px-4 py-2 text-white"
          >
            خروج
          </button>

          <div
            className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            "
          >
            {infoItems.map((item) => (
              <div
                key={item.title}
                className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                transition
                hover:bg-white/10
                "
              >
                <div
                  className="
                  mb-3
                  flex
                  items-center
                  gap-3
                  text-slate-400
                  "
                >
                  <span className="text-2xl">{item.icon}</span>

                  <span>{item.title}</span>
                </div>

                <p
                  className="
                  break-all
                  text-lg
                  font-bold
                  text-white
                  "
                >
                  {item.value || "-"}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/setting"
            className="
            mt-8
            block
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            px-6
            py-3.5
            text-center
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/30
            transition
            hover:scale-[1.02]
            hover:shadow-blue-500/40
            active:scale-95
            "
          >
            رفتن به تنظیمات
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
