import Navbar from '../components/Navbar'
import Register from '../components/Register'
import { ToastContainer } from "react-toastify";

function Signup() {
  return (
    <div>
       <ToastContainer />
      <Navbar/>
      <Register/>
    </div>
  )
}

export default Signup
