import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();


  const links = [
  {
    title: "Welcome",
    path: "/",
    icon: "👋",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "📊",
  },
  {
    title: "Setting",
    path: "/setting",
    icon: "⚙️",
  },
  {
    title: "About Us",
    path: "/aboutus",
    icon: "ℹ️",
  },
];


  return (
    <nav
      dir="rtl"
      className="
      sticky top-0 z-50
      border-b border-slate-800
      bg-slate-950/80
      backdrop-blur-xl
      "
    >

      <div
        className="
        mx-auto
        flex
        max-w-6xl
        items-center
        justify-between
        px-5
        py-4
        "
      >



        
        



        

        <div
          className="
          flex
          items-center
          gap-2
          sm:gap-4
          "
        >

          {
            links.map((link)=>(

              <Link
                key={link.path}
                to={link.path}

                className={`
                flex
                items-center
                gap-2
                rounded-xl
                px-3
                py-2
                text-sm
                font-semibold
                transition-all

                ${
                  location.pathname === link.path
                  ?
                  "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  :
                  "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
                `}
              >

                <span>
                  {link.icon}
                </span>

                <span className="hidden sm:block">
                  {link.title}
                </span>

              </Link>

            ))
          }


        </div>


      </div>

    </nav>
  );
}


export default Navbar;