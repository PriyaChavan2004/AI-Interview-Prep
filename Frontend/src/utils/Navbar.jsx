import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Profile from "./Profile"

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.userReducer)
  const navigate = useNavigate()

  const LoginRoute = () => navigate('/login')
  const RegisterRoute = () => navigate('/register')

  return (
    <div className="w-full h-[12vh] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-2xl border-b-[2px] border-zinc-600 flex items-center justify-between px-7">
      <h1 className="font-bold text-zinc-100 text-3xl">Ai prep.</h1>
      <div className="">
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Profile />
          ) : (
            <>
              <Button onClick={LoginRoute} className='bg-[#003c9c] hover:bg-[#002663]'>Login</Button>
              <Button onClick={RegisterRoute} className='bg-[#003c9c] hover:bg-[#002663]'>Register</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
