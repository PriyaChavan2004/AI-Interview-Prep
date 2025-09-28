import { useLocation } from "react-router-dom"
import MainRoutes from "./Routes/MainRoutes"
import Navbar from "./utils/Navbar"


const App = () => {

  const location = useLocation()

  const hiddenRoutes  =['/register','/login']
  return (
    <div className="w-full">
      {!hiddenRoutes.includes(location.pathname)&& <Navbar/>}
      <MainRoutes/>
    </div>
  )
}

export default App