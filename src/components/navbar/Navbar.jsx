
import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiImage,
  FiGrid,
  FiTool,
} from "react-icons/fi";

import { AuthContext } from "../../context/authContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const guestLinks = [
    {
      title: "خانه",
      path: "/",
      icon: FiHome,
    },
    {
      title: "ورود",
      path: "/login",
      icon: FiLogIn,
    },
  ];

  const privateLinks = [
    {
      title: user?.role === "admin" ? "پنل مدیریت" : "داشبورد",
      path: user?.role === "admin" ? "/admin" : "/dashboard",
      icon: user?.role === "admin" ? FiTool : FiGrid,
    },
    ...(user?.role !== "admin"
      ? [
          {
            title: "تاریخچه",
            path: "/history",
            icon: FiImage,
          },
        ]
      : []),
    {
      title: "تصویرساز AI",
      path: "/setting",
      icon: FiSettings,
    },
  ];

  const links = isAuthenticated ? privateLinks : guestLinks;

  return (
    <nav
      dir="rtl"
      className="
        sticky top-0 z-50
        w-full
        overflow-x-hidden
        border-b border-purple-500/20
        bg-gradient-to-r
        from-[#0d0718]/95
        via-[#160d2b]/95
        to-[#0d0718]/95
        px-2 py-2
        text-white
        shadow-xl shadow-purple-950/20
        backdrop-blur-xl
        sm:px-4 sm:py-3
      "
    >
      {/* Top gradient line */}
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
          mx-auto
          flex
          w-full
          max-w-6xl
          flex-nowrap
          items-center
          justify-between
          gap-1
          sm:gap-2
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            group
            flex
            shrink-0
            items-center
            gap-1
            rounded-2xl
            px-1
            py-1
            transition-all
            duration-300
            hover:-translate-y-0.5
            sm:gap-2
            sm:px-2
          "
        >
          <img
            src="/logo.jpg"
            alt="AI Image Editor"
            className="
              h-8
              w-8
              shrink-0
              rounded-lg
              object-cover
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:rotate-2
              sm:h-10
              sm:w-10
              sm:rounded-xl
            "
          />

          <span
            className="
              hidden
              bg-gradient-to-r
              from-purple-300
              via-fuchsia-300
              to-purple-400
              bg-clip-text
              text-sm
              font-medium
              text-transparent
              sm:block
            "
          >
            Modernio
          </span>
        </Link>

        {/* Navigation */}
        <div
          className="
            flex
            min-w-0
            flex-1
            flex-nowrap
            items-center
            justify-end
            gap-0
            sm:gap-1
            lg:gap-2
          "
        >
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className="
                  group
                  relative
                  flex
                  shrink-0
                  items-center
                  gap-1
                  whitespace-nowrap
                  rounded-xl
                  px-1.5
                  py-2
                  text-[11px]
                  font-medium
                  text-slate-300
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-gradient-to-r
                  hover:from-purple-500/10
                  hover:to-fuchsia-500/10
                  hover:text-purple-200
                  hover:shadow-lg
                  hover:shadow-purple-950/20
                  sm:gap-1.5
                  sm:px-3
                  sm:py-2.5
                  sm:text-sm
                  lg:px-4
                "
              >
                <Icon
                  className="
                    shrink-0
                    text-sm
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    sm:text-base
                  "
                />

                <span>{link.title}</span>

                {/* Hover underline */}
                <span
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r
                    from-purple-400
                    to-fuchsia-500
                    transition-all
                    duration-300
                    group-hover:w-2/3
                  "
                />
              </Link>
            );
          })}

          {/* Logout */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="
                group
                relative
                flex
                shrink-0
                items-center
                gap-1
                whitespace-nowrap
                rounded-xl
                px-1.5
                py-2
                text-[11px]
                font-medium
                text-red-400
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-gradient-to-r
                hover:from-red-500/10
                hover:to-purple-500/10
                hover:text-red-300
                hover:shadow-lg
                hover:shadow-red-950/20
                sm:gap-1.5
                sm:px-3
                sm:py-2.5
                sm:text-sm
                lg:px-4
              "
            >
              <FiLogOut
                className="
                  shrink-0
                  text-sm
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  group-hover:-rotate-6
                  sm:text-base
                "
              />

              <span>خروج</span>

              {/* Hover underline */}
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-r
                  from-red-400
                  to-purple-500
                  transition-all
                  duration-300
                  group-hover:w-2/3
                "
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

