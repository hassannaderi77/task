import React, { useState, useEffect, useRef } from "react";

import UsersManagement from "../components/sersManagement/UsersManagement";
import ChartManagement from "../components/chartManagement/ChartManagement";
import ManagementCard from "../components/managementCard/ManagementCard";
import HeadersPanelAdmin from "../components/headersPanelAdmin/HeadersPanelAdmin";

import { useUsers } from "../hooks/useUsers";
import { useUserHistory } from "../hooks/useUserHistory";
import { useRequestStats } from "../hooks/useRequestStats";
import { useDailyStats } from "../hooks/useDailyStats";

function AdminPanel() {
  // =========================
  // UI State
  // =========================

  const [showUsers, setShowUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRequests, setShowRequests] = useState(false);

  const usersRef = useRef(null);
  const requestsRef = useRef(null);
  // =========================
  // React Query
  // =========================

  const usersQuery = useUsers(showUsers);

  const userHistoryQuery = useUserHistory(selectedUser?._id);

  const requestStatsQuery = useRequestStats(showRequests);

  const dailyStatsQuery = useDailyStats(showRequests);

  // =========================
  // Users
  // =========================

  const users = usersQuery.data?.users || [];

  const isLoadingUsers = usersQuery.isLoading;

  const usersError = usersQuery.isError
    ? "دریافت کاربران با مشکل مواجه شد"
    : "";

  // =========================
  // User History
  // =========================

  const userHistory = userHistoryQuery.data || [];

  const isLoadingHistory = userHistoryQuery.isLoading;

  const historyError = userHistoryQuery.isError
    ? "دریافت تاریخچه کاربر با مشکل مواجه شد"
    : "";

  // =========================
  // Request Stats
  // =========================

  const requestStats = requestStatsQuery.data || [];

  const dailyStats = dailyStatsQuery.data || [];

  const isLoadingRequests =
    requestStatsQuery.isLoading || dailyStatsQuery.isLoading;

  const requestsError =
    requestStatsQuery.isError || dailyStatsQuery.isError
      ? "دریافت آمار درخواست‌ها با مشکل مواجه شد"
      : "";

  // =========================
  // Handlers
  // =========================

  useEffect(() => {
    if (showUsers) {
      usersRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showUsers]);

  useEffect(() => {
    if (showRequests) {
      requestsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showRequests]);

  const handleUsersClick = () => {
    setShowUsers((prev) => !prev);
  };

  const handleHistoryClick = (user) => {
    setSelectedUser(user);
  };

  const closeHistory = () => {
    setSelectedUser(null);
  };

  const handleRequestsClick = () => {
    setShowRequests((prev) => !prev);
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

        <HeadersPanelAdmin />

        {/* Management Cards */}

        <ManagementCard
          handleUsersClick={handleUsersClick}
          handleRequestsClick={handleRequestsClick}
        />

        {/* Users Management */}

        {showUsers && (
          <div ref={usersRef}>
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
          </div>
        )}

        {/* Chart */}

        {showRequests && (
          <div ref={requestsRef}>
            <ChartManagement
              hourlyStats={requestStats}
              dailyStats={dailyStats}
              isLoadingRequests={isLoadingRequests}
              requestsError={requestsError}
              onClose={() => setShowRequests(false)}
              requestsRef={requestsRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
