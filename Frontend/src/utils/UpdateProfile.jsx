import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UpdateProfile = () => {
  const [open, setOpen] = useState(false); // ✅ dialog control
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  // API call
  const updateProfileApi = async (formData) => {
    const res = await axios.post(
"http://localhost:3000/api/v1/user/updateProfile",
      formData,
      {
        withCredentials: true,
      }
    );
    return res.data;
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["userProfile"]);
      reset();
      setOpen(false); // ✅ close dialog after success
    },
    onError: (error) => {
      console.log(error.response);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  // Submit handler
  const onSubmit = (data) => {
    const formData = new FormData();

    // ✅ fullName tabhi bhejna jab user ne likha ho
    if (data.fullName?.trim()) {
      formData.append("fullName", data.fullName);
    }

    // ✅ photo tabhi bhejna jab user ne select ki ho
    if (data.profilPhoto?.[0]) {
      formData.append("profilPhoto", data.profilPhoto[0]);
    }

    // Agar dono empty hai toh warn karo
    if (!formData.has("fullName") && !formData.has("profilPhoto")) {
      toast.error("Please provide at least one field to update.");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">Update Profile</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Profile
          </DialogTitle>
          <DialogDescription>
            Please fill out the form below to update your profile information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          {/* Full Name */}
          <input
            type="text"
            {...register("fullName")}
            placeholder="Enter Full Name (optional)"
            className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Profile Photo */}
          <input
            type="file"
            {...register("profilPhoto")}
            className="border border-gray-400 rounded-lg px-3 py-2 outline-none file:cursor-pointer"
          />

          <Button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;