import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "@/Store/user.Reducer";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutApi = async () => {
    const res = await axios.post(
"http://localhost:3000/api/v1/user/logout",
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      console.log("Logout success response:", data);
      dispatch(removeUser());
      toast.success("Logged out successfully");
      navigate("/");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    },
  });

  const logoutHandler = () => {
    mutation.mutate();
  };

  return (
    <div onClick={logoutHandler} className="cursor-pointer">
      Logout
    </div>
  );
};

export default Logout;