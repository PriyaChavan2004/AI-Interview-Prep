import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logout from "./Logout";
import UpdateProfile from "./UpdateProfile";
const Profile = () => {
  const getProfile = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/user/getUser"
, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  // console.log("profile data", data)
  return (
    <Popover className="cursor-pointer">
      <div>
        <PopoverTrigger className="cursor-pointer">
          <div className="h-10 w-[20vw]  overflow-hidden flex items-center justify-center gap-4">
            <h1 className="text-2xl  text-zinc-300 font-bold">
              {data?.user?.fullName}
            </h1>
            {data?.user?.profilPhoto ? (
              <div>
                <img
                  src={data?.user?.profilPhoto}
                  className="h-10 w-10 rounded-[100vw]"
                  alt=""
                />
              </div>
            ) : (
             <FaUserAlt className="text-3xl text-zinc-300"/>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[15vw]">
          <div className="capitalize flex flex-col gap-3">
            <div className="flex items-center justify-start gap-2 cursor-pointer">
              <h1>
                <UpdateProfile />
              </h1>
              <FaUser />
            </div>
            <div className="flex items-center justify-start gap-2 cursor-pointer">
              <h1>
                <Logout />
              </h1>
              <IoLogOutOutline />
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default Profile;