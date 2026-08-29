import { FiUser, FiEdit3, FiPhone, FiMail } from "react-icons/fi";

import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  console.log("Dashboard user:", user);

  const infoItems = [
    {
      title: "نام",
      value: user?.name,
      icon: FiUser,
    },
    {
      title: "نام خانوادگی",
      value: user?.family,
      icon: FiEdit3,
    },
    {
      title: "شماره همراه",
      value: user?.phone,
      icon: FiPhone,
    },
    {
      title: "ایمیل",
      value: user?.email,
      icon: FiMail,
    },
  ];

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
        px-4 py-10
        text-white
        sm:py-14
      "
    >
      {/* Background glows */}
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

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div
            className="
              group relative mx-auto mb-5
              flex h-20 w-20
              items-center justify-center
              rounded-3xl
              border border-purple-400/20
              bg-gradient-to-br
              from-purple-500/20
              to-fuchsia-500/10
              text-purple-200
              shadow-xl
              shadow-purple-950/30
              transition-all duration-500
              hover:scale-110
              hover:rotate-2
            "
          >
            <FiUser
              className="
                relative z-10
                text-4xl
                transition-transform duration-500
                group-hover:scale-110
              "
            />

            <span
              className="
                pointer-events-none absolute inset-0
                rounded-3xl
                bg-gradient-to-br
                from-purple-500/10
                to-fuchsia-500/10
                opacity-0
                blur-xl
                transition-opacity duration-500
                group-hover:opacity-100
              "
            />
          </div>

          <h1
            className="
              bg-gradient-to-r
              from-purple-200
              via-fuchsia-300
              to-purple-300
              bg-clip-text
              text-4xl
              font-black
              text-transparent
              sm:text-5xl
            "
          >
            Dashboard
          </h1>

          <p className="mt-3 text-slate-400">
            مدیریت اطلاعات حساب کاربری
          </p>

          <div
            className="
              mx-auto mt-5
              h-1 w-20
              rounded-full
              bg-gradient-to-r
              from-purple-500
              to-fuchsia-500
            "
          />
        </div>

        {/* User Card */}
        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-purple-500/20
            bg-gradient-to-br
            from-[#160d2b]/90
            via-[#1d1038]/80
            to-[#0d0718]/90
            p-6
            shadow-2xl
            shadow-purple-950/40
            backdrop-blur-xl
            sm:p-10
          "
        >
          {/* Card glow */}
          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              h-40 w-40
              rounded-full
              bg-purple-600/10
              blur-3xl
            "
          />

          <div className="relative">
            {/* Card Header */}
            <div className="mb-8">
              <h2
                className="
                  text-center
                  text-2xl
                  font-medium
                  text-transparent
                  bg-gradient-to-r
                  from-purple-300
                  to-fuchsia-300
                  bg-clip-text
                  sm:text-right
                "
              >
                اطلاعات کاربر
              </h2>
            </div>

            {/* Information Grid */}
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              "
            >
              {infoItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      group
                      relative overflow-hidden
                      rounded-2xl
                      border border-purple-500/10
                      bg-gradient-to-br
                      from-white/[0.05]
                      to-purple-500/[0.03]
                      p-5
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-purple-400/30
                      hover:bg-purple-500/[0.07]
                      hover:shadow-xl
                      hover:shadow-purple-950/20
                    "
                  >
                    {/* Card hover glow */}
                    <div
                      className="
                        pointer-events-none absolute
                        -left-10 -top-10
                        h-20 w-20
                        rounded-full
                        bg-purple-500/10
                        blur-2xl
                        opacity-0
                        transition-opacity duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Title */}
                    <div
                      className="
                        relative mb-3
                        flex items-center gap-3
                        text-slate-400
                      "
                    >
                      <span
                        className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-purple-500/20
                          to-fuchsia-500/10
                          text-purple-200
                          transition-transform duration-300
                          group-hover:scale-110
                        "
                      >
                        <Icon className="text-xl" />
                      </span>

                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </div>

                    {/* Value */}
                    <p
                      className="
                        relative
                        break-all
                        text-lg
                        font-medium
                        text-white
                        transition-colors duration-300
                        group-hover:text-purple-100
                      "
                    >
                      {item.value || "-"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom gradient */}
          <div
            className="
              absolute bottom-0 left-1/2
              h-[2px] w-1/3
              -translate-x-1/2
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-fuchsia-500
              to-transparent
            "
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;