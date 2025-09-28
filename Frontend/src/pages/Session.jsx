import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CreateSessionButton from "@/utils/CreateSessionButton";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "sonner";

const Session = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getSession = async () => {
    const res = await axios.get(
       "http://localhost:3000/api/v1/session/getMySession",
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  const deleteSessionApi = async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/api/v1/session/deleteMySession/${id}`,
      { withCredentials: true }
    );
    return res.data;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteSessionApi,
    onSuccess: () => {
      toast.success("Session deleted successfully ✅");
      queryClient.invalidateQueries(["session"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete session ❌");
    },
  });

  const navigateSession = (id) => {
    navigate(`/session/${id}`);
  };

  return (
    <div
      className="w-full min-h-[88vh] p-4 md:p-10 flex flex-wrap gap-6 md:gap-[4vw] items-center justify-center 
                bg-gradient-to-b from-[#1a2540] via-[#24335a] to-[#1f2a4d]"
    >
      <CreateSessionButton />

      {isLoading ? (
        <h1 className="text-xl md:text-2xl font-semibold text-gray-200">
          Loading...
        </h1>
      ) : data?.session?.length > 0 ? (
        data.session.map((item, index) => (
          <div key={index} className="p-2 w-full sm:w-[45%] lg:w-[30%]">
            <div
              onClick={() => navigateSession(item._id)}
              className="relative group w-full min-h-[47vh] cursor-pointer
                     bg-gradient-to-br from-[#2b3a6b] to-[#1f2a4d] hover:shadow-xl 
                     rounded-3xl flex flex-col items-center justify-center 
                     transition-all duration-300 hover:scale-[1.02] border border-cyan-400/50"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutation.mutate(item._id);
                }}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 p-2"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <span className="text-xs text-gray-300">...</span>
                ) : (
                  <RiDeleteBin5Line
                    size={22}
                    className="text-red-400 cursor-pointer"
                  />
                )}
              </button>

              {/* Role Section */}
              <div className="w-[90%] h-[40%] bg-[#1e293b] rounded-2xl flex flex-col justify-center px-4 py-3 text-white shadow-md">
                <h2 className="text-lg sm:text-xl font-semibold">Role:</h2>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight truncate">
                  {item.role}
                </h1>
              </div>

              {/* Details Section */}
              <div className="h-[40%] w-[90%] flex flex-col items-start pt-4 gap-3">
                <h1
                  className="text-lg sm:text-xl lg:text-2xl h-fit max-w-full px-3 py-1 rounded-xl 
                           bg-[#0f172a] shadow-sm border border-cyan-400/50 truncate text-gray-200"
                >
                  Experience: {item.experience} years
                </h1>

                <h1
                  className="text-lg sm:text-xl lg:text-2xl h-fit max-w-full px-3 py-1 rounded-xl 
                           bg-[#0f172a] shadow-sm border border-cyan-400/50 truncate text-gray-200"
                  title={item.topicsToFocus}
                >
                  Topics to focus: {item.topicsToFocus}
                </h1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-3xl md:text-6xl font-semibold text-gray-200 text-center">
          Create Your first Session here...
        </h1>
      )}
    </div>
  );
};

export default Session;