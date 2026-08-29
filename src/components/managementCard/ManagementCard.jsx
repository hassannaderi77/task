import React from "react";
import { FiBarChart2, FiSettings, FiUsers } from "react-icons/fi";

function ManagementCard({ handleUsersClick, handleRequestsClick }) {
  return (
    <div
      className="
            mt-6
            grid gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
    >
      {/* Users */}
      <button
        type="button"
        onClick={handleUsersClick}
        className="
              group relative overflow-hidden
              rounded-3xl
              border border-purple-500/15
              bg-gradient-to-br
              from-purple-500/[0.08]
              via-[#1d1038]
              to-[#0d0718]
              p-6
              text-right
              shadow-xl
              shadow-purple-950/20
              transition-all duration-300
              hover:-translate-y-1
              hover:border-purple-400/30
              hover:shadow-2xl
              hover:shadow-purple-950/30
            "
      >
        <div
          className="
                mb-5 flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-purple-500/20
                to-fuchsia-500/10
                text-xl
              "
        >
          <FiUsers />
        </div>

        <p className="text-sm text-slate-400">کاربران</p>

        <p className="mt-2 text-2xl font-medium text-white">مدیریت کاربران</p>

        <p className="mt-2 text-xs text-slate-500">
          مشاهده و مدیریت کاربران سیستم
        </p>
      </button>

      {/* Requests */}
      <button
        type="button"
        onClick={handleRequestsClick}
        className="
              group relative overflow-hidden
              rounded-3xl
              border border-purple-500/15
              bg-gradient-to-br
              from-fuchsia-500/[0.06]
              via-[#1d1038]
              to-[#0d0718]
              p-6
              text-right
              shadow-xl
              shadow-purple-950/20
              transition-all duration-300
              hover:-translate-y-1
              hover:border-fuchsia-400/30
              hover:shadow-2xl
              hover:shadow-fuchsia-950/30
            "
      >
        <div
          className="
                mb-5 flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-fuchsia-500/20
                to-purple-500/10
                text-xl
              "
        >
          <FiBarChart2 />
        </div>

        <p className="text-sm text-slate-400">آمار سیستم</p>

        <p className="mt-2 text-2xl font-medium text-white">
          درخواست‌های امروز
        </p>

        <p className="mt-2 text-xs text-slate-500">
          مشاهده تعداد درخواست‌ها بر اساس ساعت
        </p>
      </button>

      {/* Settings */}
      <button
        type="button"
        className="
              group relative overflow-hidden
              rounded-3xl
              border border-purple-500/15
              bg-gradient-to-br
              from-violet-500/[0.06]
              via-[#1d1038]
              to-[#0d0718]
              p-6
              text-right
              shadow-xl
              shadow-purple-950/20
              transition-all duration-300
              hover:-translate-y-1
              hover:border-violet-400/30
              hover:shadow-2xl
              hover:shadow-violet-950/30
            "
      >
        <div
          className="
                mb-5 flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-500/20
                to-purple-500/10
                text-xl
              "
        >
          <FiSettings />
        </div>

        <p className="text-sm text-slate-400">تنظیمات</p>

        <p className="mt-2 text-2xl font-medium text-white">تنظیمات سیستم</p>

        <p className="mt-2 text-xs text-slate-500">مدیریت تنظیمات کلی سیستم</p>
      </button>
    </div>
  );
}

export default ManagementCard;
