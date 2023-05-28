import Navbar from '../components/Navbar'
import Fileinput from '../components/Fileinput'
import Imagegallery from '../components/Imagegallery'
import { ToastContainer } from "react-toastify";

function Home() {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Fileinput/>
      <Imagegallery/>
    </div>
  )
}

export default Home
