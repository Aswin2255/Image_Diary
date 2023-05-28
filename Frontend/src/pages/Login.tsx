import Navbar from '../components/Navbar'
import Signin from '../components/Signin'
import { ToastContainer } from "react-toastify";

function Login() {

  return (
    <div>
      <ToastContainer/>
        <Navbar/>
      <Signin/>
    </div>
  )
}

export default Login
