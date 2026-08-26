import React from 'react'
import { FiImage } from 'react-icons/fi'

function DekstopTable({users, onHistoryClick,}) {
  return (
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
                        ? new Date(user.createdAt).toLocaleDateString("fa-IR")
                        : "-"}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onHistoryClick(user)}
                        className="
                          flex items-center gap-2
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
                        <FiImage size={15} />
                        تاریخچه
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

                    <p className="mt-1 text-slate-400">{user.phone || "-"}</p>
                  </div>

                  <div>
                    <span className="text-slate-600">ثبت‌نام</span>

                    <p className="mt-1 text-slate-400">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("fa-IR")
                        : "-"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onHistoryClick(user)}
                  className="
                    mt-4
                    flex w-full
                    items-center justify-center gap-2
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
                  <FiImage size={15} />
                  مشاهده تاریخچه
                </button>
              </div>
            ))}
          </div>
        </div>
  )
}

export default DekstopTable