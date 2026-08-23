import React from 'react'
import Loading from '../ui/Loading'

function UsersManagement({ users,
  usersError,
  isLoadingUsers,
  onClose,
  onHistoryClick,
  selectedUser,
  userHistory,
  isLoadingHistory,
  historyError,
  onCloseHistory,}) {
  return (
    <div
                className="
                  mt-6
                  overflow-hidden
                  rounded-3xl
                  border border-purple-500/20
                  bg-gradient-to-br
                  from-[#160d2b]/95
                  via-[#1d1038]/90
                  to-[#0d0718]/95
                  shadow-2xl
                  shadow-purple-950/30
                "
              >
                {/* Users Header */}
    
                <div
                  className="
                    flex flex-col gap-4
                    border-b border-purple-500/10
                    p-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:p-6
                  "
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-xl
                          bg-purple-500/10
                          text-lg
                        "
                      >
                        👥
                      </div>
    
                      <div>
                        <h2 className="text-xl font-black text-purple-100">
                          مدیریت کاربران
                        </h2>
    
                        <p className="mt-1 text-xs text-slate-500">
                          مشاهده کاربران ثبت شده در سیستم
                        </p>
                      </div>
                    </div>
                  </div>
    
                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      w-fit
                      rounded-xl
                      border border-purple-500/20
                      bg-purple-500/10
                      px-4 py-2
                      text-sm
                      text-purple-200
                      transition
                      hover:bg-purple-500/20
                    "
                  >
                    بستن
                  </button>
                </div>
    
                {/* Loading */}
    
                {isLoadingUsers && (
                  <div className="flex justify-center px-5 py-10">
                    <Loading />
                  </div>
                )}
    
                {/* Error */}
    
                {!isLoadingUsers && usersError && (
                  <div className="p-5">
                    <div
                      className="
                        rounded-2xl
                        border border-red-500/20
                        bg-red-500/5
                        p-5
                        text-center
                        text-sm
                        text-red-300
                      "
                    >
                      {usersError}
                    </div>
                  </div>
                )}
    
                {/* Users */}
    
                {!isLoadingUsers && !usersError && users.length > 0 && (
                  <div className="p-4 sm:p-6">
                    {/* Desktop Table */}
    
                    <div className="hidden overflow-x-auto md:block">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-purple-500/10 text-right">
                            <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                              نام
                            </th>
    
                            <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                              ایمیل
                            </th>
    
                            <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                              شماره
                            </th>
    
                            <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                              نقش
                            </th>
    
                            <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                              تاریخ ثبت‌نام
                            </th>
    
                            <th className="px-4 py-4 text-sm font-semibold text-slate-400">
                              عملیات
                            </th>
                          </tr>
                        </thead>
    
                        <tbody>
                          {users.map((user) => (
                            <tr
                              key={user._id}
                              className="
                                  border-b border-purple-500/5
                                  transition
                                  hover:bg-purple-500/[0.04]
                                "
                            >
                              <td className="px-4 py-4">
                                <div className="font-semibold text-purple-50">
                                  {user.name || "-"} {user.family || ""}
                                </div>
                              </td>
    
                              <td className="px-4 py-4 text-sm text-slate-400">
                                {user.email || "-"}
                              </td>
    
                              <td className="px-4 py-4 text-sm text-slate-400">
                                {user.phone || "-"}
                              </td>
    
                              <td className="px-4 py-4">
                                <span
                                  className="
                                      rounded-lg
                                      border border-purple-500/20
                                      bg-purple-500/10
                                      px-3 py-1.5
                                      text-xs
                                      text-purple-200
                                    "
                                >
                                  {user.role || "user"}
                                </span>
                              </td>
    
                              <td className="px-4 py-4 text-sm text-slate-500">
                                {user.createdAt
                                  ? new Date(user.createdAt).toLocaleDateString(
                                      "fa-IR",
                                    )
                                  : "-"}
                              </td>
    
                              <td className="px-4 py-4">
                                <button
                                  type="button"
                                  onClick={() => onHistoryClick(user)}
                                  className="
                                      rounded-xl
                                      border border-fuchsia-500/20
                                      bg-fuchsia-500/10
                                      px-3 py-2
                                      text-xs font-semibold
                                      text-fuchsia-200
                                      transition
                                      hover:bg-fuchsia-500/20
                                    "
                                >
                                  🖼️ تاریخچه
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
    
                    {/* Mobile Cards */}
    
                    <div className="space-y-3 md:hidden">
                      {users.map((user) => (
                        <div
                          key={user._id}
                          className="
                              rounded-2xl
                              border border-purple-500/10
                              bg-white/[0.02]
                              p-4
                            "
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-purple-50">
                                {user.name || "-"} {user.family || ""}
                              </p>
    
                              <p className="mt-1 text-xs text-slate-500">
                                {user.email || "-"}
                              </p>
                            </div>
    
                            <span
                              className="
                                  shrink-0
                                  rounded-lg
                                  border border-purple-500/20
                                  bg-purple-500/10
                                  px-2.5 py-1
                                  text-xs
                                  text-purple-200
                                "
                            >
                              {user.role || "user"}
                            </span>
                          </div>
    
                          <div
                            className="
                                mt-4
                                grid grid-cols-2
                                gap-3
                                text-xs
                              "
                          >
                            <div>
                              <span className="text-slate-600">شماره</span>
    
                              <p className="mt-1 text-slate-400">
                                {user.phone || "-"}
                              </p>
                            </div>
    
                            <div>
                              <span className="text-slate-600">ثبت‌نام</span>
    
                              <p className="mt-1 text-slate-400">
                                {user.createdAt
                                  ? new Date(user.createdAt).toLocaleDateString(
                                      "fa-IR",
                                    )
                                  : "-"}
                              </p>
                            </div>
                          </div>
    
                          <button
                            type="button"
                            onClick={() => onHistoryClick(user)}
                            className="
                                mt-4
                                w-full
                                rounded-xl
                                border border-fuchsia-500/20
                                bg-fuchsia-500/10
                                px-3 py-2.5
                                text-xs font-semibold
                                text-fuchsia-200
                                transition
                                hover:bg-fuchsia-500/20
                              "
                          >
                            🖼️ مشاهده تاریخچه
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
    
                {/* Empty */}
    
                {!isLoadingUsers && !usersError && users.length === 0 && (
                  <div className="px-5 py-12 text-center">
                    <div className="text-4xl">👥</div>
    
                    <p className="mt-4 font-bold text-purple-100">
                      هنوز کاربری ثبت نشده است
                    </p>
    
                    <p className="mt-2 text-sm text-slate-500">
                      کاربران ثبت شده در این بخش نمایش داده می‌شوند.
                    </p>
                  </div>
                )}
    
                {/* User History */}
    
                {selectedUser && (
                  <div
                    className="
                      border-t
                      border-fuchsia-500/10
                      bg-black/10
                      p-4
                      sm:p-6
                    "
                  >
                    {/* History Header */}
    
                    <div
                      className="
                        mb-6
                        flex flex-col gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex h-10 w-10
                              items-center justify-center
                              rounded-xl
                              bg-fuchsia-500/10
                              text-lg
                            "
                          >
                            🖼️
                          </div>
    
                          <div>
                            <h2 className="text-xl font-black text-fuchsia-100">
                              تاریخچه کاربر
                            </h2>
    
                            <p className="mt-1 text-sm text-slate-400">
                              {selectedUser.name || "-"} {selectedUser.family || ""}
                            </p>
                          </div>
                        </div>
                      </div>
    
                      <button
                        type="button"
                        onClick={onCloseHistory}
                        className="
                          w-fit
                          rounded-xl
                          border border-purple-500/20
                          bg-purple-500/10
                          px-4 py-2
                          text-sm
                          text-purple-200
                          transition
                          hover:bg-purple-500/20
                        "
                      >
                        بستن تاریخچه
                      </button>
                    </div>
    
                    {/* History Loading */}
    
                    {isLoadingHistory && (
                      <div className="flex justify-center py-12">
                        <Loading />
                      </div>
                    )}
    
                    {/* History Error */}
    
                    {!isLoadingHistory && historyError && (
                      <div
                        className="
                          rounded-2xl
                          border border-red-500/20
                          bg-red-500/5
                          p-5
                          text-center
                          text-sm
                          text-red-300
                        "
                      >
                        {historyError}
                      </div>
                    )}
    
                    {/* Empty History */}
    
                    {!isLoadingHistory &&
                      !historyError &&
                      userHistory.length === 0 && (
                        <div className="py-10 text-center">
                          <div className="text-4xl">🖼️</div>
    
                          <p className="mt-4 font-bold text-purple-100">
                            این کاربر هنوز تصویری ویرایش نکرده است
                          </p>
    
                          <p className="mt-2 text-sm text-slate-500">
                            تاریخچه ویرایش‌های کاربر در این بخش نمایش داده می‌شود.
                          </p>
                        </div>
                      )}
    
                    {/* History Items */}
    
                    {!isLoadingHistory &&
                      !historyError &&
                      userHistory.length > 0 && (
                        <div
                          className="
                            grid gap-5
                            sm:grid-cols-2
                            lg:grid-cols-3
                          "
                        >
                          {userHistory.map((item) => (
                            <div
                              key={item._id}
                              className="
                                overflow-hidden
                                rounded-2xl
                                border border-purple-500/15
                                bg-white/[0.03]
                                shadow-lg
                                shadow-purple-950/10
                              "
                            >
                              {/* Images */}
    
                              <div className="grid grid-cols-2 gap-2 p-2">
                                {/* Before */}
    
                                <div>
                                  <p className="mb-2 text-center text-[11px] text-slate-500">
                                    اولیه
                                  </p>
    
                                  <img
                                    src={`http://localhost:5000${item.beforeImage}`}
                                    alt="Before"
                                    className="
                                      aspect-square
                                      w-full
                                      rounded-xl
                                      object-cover
                                    "
                                  />
                                </div>
    
                                {/* After */}
    
                                <div>
                                  <p className="mb-2 text-center text-[11px] text-fuchsia-300">
                                    نتیجه
                                  </p>
    
                                  <img
                                    src={item.afterImage}
                                    alt="After"
                                    className="
                                      aspect-square
                                      w-full
                                      rounded-xl
                                      object-cover
                                    "
                                  />
                                </div>
                              </div>
    
                              {/* History Information */}
    
                              <div className="px-4 pb-4">
                                <div
                                  className="
                                    flex items-center
                                    justify-between
                                    gap-2
                                  "
                                >
                                  <span className="text-xs text-slate-500">
                                    {item.createdAt
                                      ? new Date(item.createdAt).toLocaleDateString(
                                          "fa-IR",
                                        )
                                      : "-"}
                                  </span>
    
                                  <span
                                    className="
                                      rounded-lg
                                      border border-purple-500/20
                                      bg-purple-500/10
                                      px-2 py-1
                                      text-[11px]
                                      text-purple-200
                                    "
                                  >
                                    ویرایش
                                  </span>
                                </div>
    
                                <div className="mt-4 space-y-2">
                                  <div className="flex justify-between gap-3 text-xs">
                                    <span className="text-slate-500">
                                      نوع ویرایش
                                    </span>
    
                                    <span className="text-purple-100">
                                      {item.firstSelect || "-"}
                                    </span>
                                  </div>
    
                                  <div className="flex justify-between gap-3 text-xs">
                                    <span className="text-slate-500">
                                      میزان تغییر
                                    </span>
    
                                    <span className="text-purple-100">
                                      {item.secondSelect || "-"}
                                    </span>
                                  </div>
    
                                  <div className="flex justify-between gap-3 text-xs">
                                    <span className="text-slate-500">دستگاه</span>
    
                                    <span className="text-purple-100">
                                      {item.device || "-"}
                                    </span>
                                  </div>
    
                                  <div className="flex justify-between gap-3 text-xs">
                                    <span className="text-slate-500">برند</span>
    
                                    <span className="text-purple-100">
                                      {item.brand || "-"}
                                    </span>
                                  </div>
                                </div>
    
                                {item.description && (
                                  <div
                                    className="
                                      mt-4
                                      rounded-xl
                                      border border-purple-500/10
                                      bg-purple-500/[0.03]
                                      p-3
                                    "
                                  >
                                    <p className="text-[11px] text-slate-500">
                                      توضیحات
                                    </p>
    
                                    <p className="mt-1 break-words text-xs leading-6 text-slate-300">
                                      {item.description}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
  )
}

export default UsersManagement