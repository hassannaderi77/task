import React, { useState } from "react";
import {
  FiTool,
  FiUsers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

import UsersManagement from "../components/sersManagement/UsersManagement";
import ChartManagement from "../components/chartManagement/ChartManagement";

function AdminPanel() {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const [showRequests, setShowRequests] = useState(false);
  const [requestStats, setRequestStats] = useState([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [requestsError, setRequestsError] = useState("");

  const fetchRequestStats = async () => {
    try {
      setIsLoadingRequests(true);
      setRequestsError("");

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/history/stats/today`
);

      if (!response.ok) {
        throw new Error("Failed to fetch request stats");
      }

      const data = await response.json();
      setRequestStats(data.stats || []);
    } catch (error) {
      console.error("Get request stats error:", error);
      setRequestsError("دریافت آمار درخواست‌ها با مشکل مواجه شد");
    } finally {
      setIsLoadingRequests(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      setUsersError("");

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/users`
);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Get users error:", error);
      setUsersError("دریافت کاربران با مشکل مواجه شد");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleUsersClick = () => {
    setShowUsers((prev) => !prev);

    if (!showUsers && users.length === 0) {
      fetchUsers();
    }
  };

  const handleHistoryClick = async (user) => {
    try {
      setSelectedUser(user);
      setIsLoadingHistory(true);
      setHistoryError("");
      setUserHistory([]);

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/history/${user._id}`
);

      if (!response.ok) {
        throw new Error("Failed to fetch user history");
      }

      const data = await response.json();

      setUserHistory(
        Array.isArray(data) ? data : data.history || []
      );
    } catch (error) {
      console.error("Get user history error:", error);
      setHistoryError("دریافت تاریخچه کاربر با مشکل مواجه شد");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const closeHistory = () => {
    setSelectedUser(null);
    setUserHistory([]);
    setHistoryError("");
  };

  const handleRequestsClick = () => {
    setShowRequests((prev) => !prev);

    if (!showRequests && requestStats.length === 0) {
      fetchRequestStats();
    }
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
        p-5 text-white
        sm:p-8
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-32 -top-32
          h-80 w-80
          rounded-full
          bg-purple-600/15
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 -left-32
          h-80 w-80
          rounded-full
          bg-fuchsia-600/10
          blur-[110px]
        "
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-purple-500/20
            bg-gradient-to-br
            from-[#160d2b]
            via-[#1d1038]
            to-[#0d0718]
            p-6
            shadow-2xl
            shadow-purple-950/30
            sm:p-8
          "
        >
          {/* Header gradient line */}
          <div
            className="
              absolute left-0 right-0 top-0
              h-[2px]
              bg-gradient-to-r
              from-purple-600
              via-fuchsia-500
              to-purple-600
            "
          />

          <div
            className="
              flex flex-col gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <div className="mb-3 flex items-center gap-3">

                {/* Admin icon */}
                <span
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-purple-500
                    to-fuchsia-600
                    text-xl
                    shadow-lg
                    shadow-purple-500/25
                  "
                >
                  <FiTool />
                </span>

                <div>
                  <h1
                    className="
                      text-3xl font-black
                      text-transparent
                      bg-gradient-to-r
                      from-purple-200
                      via-fuchsia-300
                      to-purple-300
                      bg-clip-text
                    "
                  >
                    پنل مدیریت
                  </h1>

                  <div
                    className="
                      mt-1 h-1 w-20
                      rounded-full
                      bg-gradient-to-r
                      from-purple-500
                      to-fuchsia-500
                    "
                  />
                </div>
              </div>

              <p className="text-sm text-slate-400">
                مدیریت کاربران، تصاویر و تنظیمات سیستم
              </p>
            </div>

            {/* System status */}
            <div
              className="
                rounded-2xl
                border border-purple-500/20
                bg-gradient-to-r
                from-purple-500/10
                to-fuchsia-500/10
                px-4 py-3
                text-center
              "
            >
              <p className="text-xs text-slate-500">
                وضعیت سیستم
              </p>

              <div className="mt-1 flex items-center justify-center gap-2">
                <span
                  className="
                    h-2 w-2
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                  "
                />

                <span className="text-sm font-semibold text-emerald-300">
                  فعال
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Management Cards */}
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

            <p className="text-sm text-slate-400">
              کاربران
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              مدیریت کاربران
            </p>

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

            <p className="text-sm text-slate-400">
              آمار سیستم
            </p>

            <p className="mt-2 text-2xl font-black text-white">
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

            <p className="text-sm text-slate-400">
              تنظیمات
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              تنظیمات سیستم
            </p>

            <p className="mt-2 text-xs text-slate-500">
              مدیریت تنظیمات کلی سیستم
            </p>
          </button>
        </div>

        {/* Users Management */}
        {showUsers && (
          <UsersManagement
            users={users}
            usersError={usersError}
            isLoadingUsers={isLoadingUsers}
            onClose={() => setShowUsers(false)}
            onHistoryClick={handleHistoryClick}
            selectedUser={selectedUser}
            userHistory={userHistory}
            isLoadingHistory={isLoadingHistory}
            historyError={historyError}
            onCloseHistory={closeHistory}
          />
        )}

        {/* Chart */}
        {showRequests && (
          <ChartManagement
            requestStats={requestStats}
            isLoadingRequests={isLoadingRequests}
            requestsError={requestsError}
            onClose={() => setShowRequests(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPanel;