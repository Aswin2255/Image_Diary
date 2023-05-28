import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux/es/exports";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";

function App() {
  type state = {
    mode: {
      darkmode: boolean;
    };
  };
  type userstate = {
    auth:{
      username : string,
      logedin :boolean
    }
  }
  const darkmode = useSelector((state: state) => state.mode.darkmode);
  const userlogedin = useSelector((state:userstate)=>state.auth.logedin)

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <div className=" min-h-screen dark:bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={! userlogedin ? <Login /> : <Navigate replace to='/' />}></Route>
          <Route path="/signup" element={ ! userlogedin ?  <Signup /> : <Navigate replace to='/'/>}></Route>
          <Route path="/" element={ userlogedin ? <Home /> : <Navigate replace to='/login'/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
