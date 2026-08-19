import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [verify, setVerify] = useState("");
  const [phone, setPhone] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("");

  const { pass } = useContext(AuthContext);

  const navigate = useNavigate();


  const changeHandler = () => {

    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setPhoneError("شماره همراه صحیح نمیباشد");
      return;
    }


    if (verify === pass) {
      setError("");
      setPhoneError("");
      navigate("/setting");
    } else {
      setError("کد وارد شده صحیح نمیباشد");
    }

  };


  const inputClass =
    `
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/5
    px-5
    py-3.5
    text-center
    text-white
    placeholder:text-slate-500
    outline-none
    backdrop-blur-md
    transition
    duration-300
    focus:border-blue-400
    focus:bg-white/10
    focus:ring-4
    focus:ring-blue-500/20
    `;


  return (
    <div
      dir="rtl"
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-blue-950
      px-4
      "
    >


      <div
        className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        shadow-2xl
        backdrop-blur-xl
        sm:p-10
        "
      >


        <div className="mb-8 text-center">


          <div
            className="
            mx-auto
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-blue-600/20
            text-3xl
            "
          >
            🔐
          </div>


          <h1
            className="
            text-3xl
            font-black
            text-white
            sm:text-4xl
            "
          >
            تایید شماره همراه
          </h1>


          <p className="mt-3 text-sm text-slate-400">
            برای ادامه، شماره و کد تایید را وارد کنید
          </p>


        </div>



        <div className="flex flex-col gap-5">


          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              شماره همراه
            </label>


            <input
              value={phone}
              onChange={(e)=>{

                const value = e.target.value;

                if(/^\d*$/.test(value)){
                  setPhone(value);
                }

              }}
              type="tel"
              maxLength={11}
              placeholder="09123456789"
              className={inputClass}
            />


            {phoneError && (
              <p
                className="
                mt-3
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
                "
              >
                {phoneError}
              </p>
            )}

          </div>




          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              کد تایید
            </label>


            <input
              value={verify}
              onChange={(e)=>setVerify(e.target.value)}
              type="text"
              maxLength={6}
              placeholder="******"
              className={inputClass}
            />


            {error && (
              <p
                className="
                mt-3
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
                "
              >
                {error}
              </p>
            )}

</div>




          <button
            onClick={changeHandler}
            className="
            mt-3
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            py-3.5
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/30
            transition
            duration-300
            hover:scale-[1.02]
            hover:shadow-blue-500/40
            active:scale-95
            "
          >
            تایید و ادامه
          </button>



        </div>


      </div>


    </div>
  );
}

export default Home;