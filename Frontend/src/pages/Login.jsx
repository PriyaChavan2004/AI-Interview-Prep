import { Button } from "@/components/ui/button";
import { addUser } from "@/Store/user.Reducer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (formdata) => {
    const res = await axios.post(
"http://localhost:3000/api/v1/user/login",
      formdata,
      { withCredentials: true }
    );
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(addUser());
      navigate("/session");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const loginFormHandler = (formdata) => {
    mutation.mutate(formdata);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit(loginFormHandler)}
        className="px-8 py-10 flex flex-col items-center justify-center gap-6 
               bg-white/10 backdrop-blur-md border border-white/20 
               rounded-2xl shadow-2xl w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%]"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-extrabold text-3xl md:text-4xl text-[#0062ff] drop-shadow-lg"
        >
          Login
        </motion.h1>

        {/* Email */}
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="outline-none border-b-2 border-zinc-400 focus:border-[#0062ff] 
                 transition-all duration-300 w-full py-2 px-2 bg-transparent placeholder-zinc-400 text-white"
        />

        {/* Password */}
        <input
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className="outline-none border-b-2 border-zinc-400 focus:border-[#0062ff] 
                 transition-all duration-300 w-full py-2 px-2 bg-transparent placeholder-zinc-400 text-white"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-[#003c9c] hover:bg-[#002663] text-white py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          {mutation.isPending ? "Loading..." : "Login"}
        </Button>

        {/* Footer */}
        <span className="text-sm text-zinc-300">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#0062ff] hover:underline font-medium"
          >
            Register here
          </Link>
        </span>
      </motion.form>
    </div>
  );
};

export default Login;