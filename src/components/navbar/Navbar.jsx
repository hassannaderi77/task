import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
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
      icon: "🏠",
    },
    {
      title: "ورود",
      path: "/login",
      icon: "🔐",
    },
  ];

  const privateLinks = [
    {
      title: "خانه",
      path: "/",
      icon: "🏠",
    },

    {
      title: user?.role === "admin" ? "پنل مدیریت" : "داشبورد",
      path: user?.role === "admin" ? "/admin" : "/dashboard",
      icon: user?.role === "admin" ? "🛠️" : "📊",
    },

    {
      title: "تنظیمات",
      path: "/setting",
      icon: "⚙️",
    },
  ];

  const links = isAuthenticated ? privateLinks : guestLinks;

  return (
    <nav
      dir="rtl"
      className="
        sticky top-0 z-50
        border-b border-purple-500/20
        bg-gradient-to-r
        from-[#0d0718]/95
        via-[#160d2b]/95
        to-[#0d0718]/95
        px-4 py-3
        text-white
        shadow-xl shadow-purple-950/20
        backdrop-blur-xl
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

      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="
            group flex items-center gap-2
            rounded-2xl
            px-2 py-1
            transition-all duration-300
            hover:-translate-y-0.5
          "
        >
          <span
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-purple-500
              to-fuchsia-600
              text-lg
              shadow-lg
              shadow-purple-500/25
              transition-all duration-300
              group-hover:scale-105
              group-hover:rotate-2
            "
          >
            ✨
          </span>

          <span
            className="
              hidden text-sm font-black
              text-transparent
              bg-gradient-to-r
              from-purple-300
              via-fuchsia-300
              to-purple-400
              bg-clip-text
              sm:block
            "
          >
            AI Image Editor
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="
                group relative
                flex items-center gap-1.5
                rounded-xl
                px-3 py-2.5
                text-sm font-bold
                text-slate-300

                transition-all duration-300

                hover:-translate-y-0.5
                hover:bg-gradient-to-r
                hover:from-purple-500/10
                hover:to-fuchsia-500/10
                hover:text-purple-200
                hover:shadow-lg
                hover:shadow-purple-950/20

                sm:px-4
              "
            >
              <span
                className="
                  text-base
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                {link.icon}
              </span>

              <span>
                {link.title}
              </span>

              {/* Hover underline */}
              <span
                className="
                  absolute bottom-0
                  left-1/2
                  h-[2px] w-0
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-r
                  from-purple-400
                  to-fuchsia-500
                  transition-all duration-300
                  group-hover:w-2/3
                "
              />
            </Link>
          ))}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="
                group relative
                flex items-center gap-1.5
                rounded-xl
                px-3 py-2.5
                text-sm font-bold
                text-red-400

                transition-all duration-300

                hover:-translate-y-0.5
                hover:bg-gradient-to-r
                hover:from-red-500/10
                hover:to-purple-500/10
                hover:text-red-300
                hover:shadow-lg
                hover:shadow-red-950/20

                sm:px-4
              "
            >
              <span
                className="
                  text-base
                  transition-transform duration-300
                  group-hover:scale-110
                  group-hover:-rotate-6
                "
              >
                🚪
              </span>

              <span>
                خروج
              </span>

              {/* Hover underline */}
              <span
                className="
                  absolute bottom-0
                  left-1/2
                  h-[2px] w-0
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-r
                  from-red-400
                  to-purple-500
                  transition-all duration-300
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