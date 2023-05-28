import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Themeaction } from "../Redux/Themeslice";
import { Authaction } from "../Redux/Authslice";
import { Link } from "react-router-dom";

function Navbar() {
  type state = {
    mode : {
      darkmode : boolean
    }
  }
  type authstate = {
   auth:{
    username : string,
    logedin : boolean
   }
  }
  const [shownav, setshownav] = useState<boolean>(false);
  const dispatch = useDispatch();
  const username = useSelector((state:authstate)=>state.auth.username)
  const logedin = useSelector((state:authstate)=>state.auth.logedin)
  const dark = useSelector((state: state) => state.mode.darkmode);
  const darkmode = (dark: boolean) => {
    dispatch(Themeaction.Setmode(!dark));
  };
  const logout = ()=>{
    dispatch(Authaction.Setlogout())
  }
  return (
    <nav className="bg-white border-gray-200  dark:bg-gray-900 top-0 sticky">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://google.com/" className="flex items-center">
          <img
            src="https://cloudinary-res.cloudinary.com/image/upload/website/cloudinary_web_favicon.png"
            className="h-8 mr-3"
            alt=" Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Image Diary
          </span>
        </a>

        <button
          onClick={() => setshownav(!shownav)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div
          className={
            shownav
              ? " w-full md:block md:w-auto"
              : "hidden w-full md:block md:w-auto"
          }
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button onClick={() => darkmode(dark)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 dark:text-white  text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </button>
            </li>

            <li>
              <p
               
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {logedin ? username : ''}
              </p>
            </li>
            <li>
              {
                logedin ? <p
                onClick={logout}
                  
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </p> : <Link to='/login'>
                <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                 Login
                </p>
                </Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
