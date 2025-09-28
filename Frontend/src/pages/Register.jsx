import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // ✅ Register API call
  const registerApi = async (formdata) => {
    const res = await axios.post(
 "http://localhost:3000/api/v1/user/register",
       formdata,
      { withCredentials: true }
    );
    return res.data;
  };

  // ✅ Mutation hook
  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      // Success hone par session page pe le jao
      // console.log("Register Success:", data);
      navigate("/login");
      toast.success("Registered successfully!");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Something went wrong!");
    },
  });

  // ✅ Form submit handler
  const registerFormHandler = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit(registerFormHandler)}
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
          Register
        </motion.h1>

        {/* Full Name */}
        <input
          type="text"
          {...register("fullName")}
          placeholder="Enter your name"
          className="outline-none border-b-2 border-zinc-400 focus:border-[#0062ff] 
                 transition-all duration-300 w-full py-2 px-2 bg-transparent placeholder-zinc-400 text-white"
        />

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
          disabled={mutation.isPending}
          className="w-full mt-4 bg-[#003c9c] hover:bg-[#002663] text-white py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </Button>

        {/* Footer */}
        <span className="text-sm text-zinc-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0062ff] hover:underline font-medium"
          >
            Login here
          </Link>
        </span>
      </motion.form>
    </div>
  );
};

export default Register;