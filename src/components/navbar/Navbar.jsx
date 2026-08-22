import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
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
    {
      title: "درباره ما",
      path: "/aboutus",
      icon: "ℹ️",
    },
  ];

  const privateLinks = [
    {
      title: "خانه",
      path: "/",
      icon: "🏠",
    },
    {
      title: "داشبورد",
      path: "/dashboard",
      icon: "📊",
    },
    {
      title: "تنظیمات",
      path: "/setting",
      icon: "⚙️",
    },
    {
      title: "درباره ما",
      path: "/aboutus",
      icon: "ℹ️",
    },
  ];

  const links = isAuthenticated ? privateLinks : guestLinks;

  return (
    <nav
      dir="rtl"
      className="
        border-b
        border-white/10
        bg-slate-950/80
        px-4
        py-4
        text-white
        backdrop-blur-xl
      "
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        

        <div className="flex items-center gap-2 sm:gap-4">
          {links.map((link) => (
            <Link
  key={link.path}
  to={link.path}
  className="
    rounded-xl
    px-3
    py-2
    text-sm
    font-bold
    text-slate-300
    transition
    hover:bg-white/10
    hover:text-white
  "
>
  <span className="sm:ml-1">
    {link.icon}
  </span>

  <span className="hidden sm:inline">
    {link.title}
  </span>
</Link>
          ))}

          {isAuthenticated && (
  <button
    onClick={handleLogout}
    className="
      rounded-xl
      px-3
      py-2
      text-sm
      font-bold
      text-red-400
      transition
      hover:bg-red-500/10
      hover:text-red-300
    "
  >
    🚪 <span className="hidden sm:inline">خروج</span>
  </button>
)}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;