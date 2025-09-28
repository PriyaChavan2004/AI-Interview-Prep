import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CreateSessionButton = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // control dialog manually

  const createSessionApi = async (formData) => {
    const res = await axios.post(
      "http://localhost:3000/api/v1/session/createSession",
      formData,
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return res.data; // return the created session data
  };

  const mutation = useMutation({
    mutationFn: createSessionApi,
    onSuccess: (data) => {
      toast.success("Session Created ✅");
      reset();
      queryClient.invalidateQueries({ queryKey: ["session"] });
      setOpen(false); // close dialog
      navigate(`/session/${data.session._id}`); // navigate to session details
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create session ❌");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="fixed top-20 right-5 p-3 px-6 font-bold text-white bg-zinc-900 rounded-4xl text-[19px] cursor-pointer">
        Create Session
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the details for your session</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              {...register("role")}
              placeholder="Enter your role"
              className="outline-0 border-b border-black w-[35vw] py-1"
              required
            />
            <input
              type="number"
              {...register("experience")}
              placeholder="Enter your experience"
              className="outline-0 border-b border-black w-[35vw] py-1"
              required
            />
            <input
              type="text"
              {...register("topicsToFocus")}
              placeholder="Enter topics to focus"
              className="outline-0 border-b border-black w-[35vw] py-1"
              required
            />
            <button
              type="submit"
              className="px-3 py-2 bg-zinc-900 text-white rounded-2xl mt-4 self-start"
            >
              Create Session
            </button>
          </form>
          <DialogDescription>Please provide form details carefully</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionButton;
