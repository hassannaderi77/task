import React, { useState } from "react";

import UsersManagement from "../components/sersManagement/UsersManagement";
import ChartManagement from "../components/chartManagement/ChartManagement";
import ManagementCard from "../components/managementCard/ManagementCard";
import HeadersPanelAdmin from "../components/headersPanelAdmin/HeadersPanelAdmin";

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
  const [dailyStats, setDailyStats] = useState([]);
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

  const fetchDailyStats = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/history/stats/daily`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch daily request stats");
    }

    const data = await response.json();

    setDailyStats(data.stats || []);
  } catch (error) {
    console.error("Get daily request stats error:", error);
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

  if (!showRequests) {
    if (requestStats.length === 0) {
      fetchRequestStats();
    }

    if (dailyStats.length === 0) {
      fetchDailyStats();
    }
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
        
        <HeadersPanelAdmin />

        {/* Management Cards */}
        
        <ManagementCard handleUsersClick={handleUsersClick}  handleRequestsClick={handleRequestsClick} />

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
            hourlyStats={requestStats}
            dailyStats={dailyStats}
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