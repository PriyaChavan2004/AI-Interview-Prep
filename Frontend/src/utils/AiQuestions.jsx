import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuPinOff } from "react-icons/lu";
import { MdOutlinePushPin } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { toast } from "sonner";

const AiQuestions = () => {
  const param = useParams();
  const queryClient = useQueryClient();

  // Fetch session details with questions
  const getSessionDetail = async () => {
    const res = await axios.get(
  `http://localhost:3000/api/v1/session/getMySessionById/${param.id}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["sessionDetail", param.id],
    queryFn: getSessionDetail,
  });

  // Toggle pin API
  const togglePinApi = async (id) => {
    const res = await axios.post(
  `http://localhost:3000/api/v1/question/toggleQuestion/${id}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: togglePinApi,
    onSuccess: () => {
      toast.success("Question pin status changed");
      queryClient.invalidateQueries({ queryKey: ["sessionDetail", param.id] });
    },
  });

  const togglePin = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-300">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div className="mt-10 w-[60vw] mr-2.5 flex flex-col items-center gap-6">
        <AnimatePresence>
          {data?.session?.questions.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full md:w-[70%] lg:w-[60%]" // parent responsive width
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={item._id}>
                  <AccordionTrigger
                    className="w-full bg-gradient-to-r from-[#2b3a6b] to-[#243d8d] text-white px-4 py-3 rounded-2xl flex items-center gap-3
                   hover:scale-[1.02] transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <p className="flex-1 text-sm md:text-base lg:text-lg font-medium">
                      {item?.question}
                    </p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(item._id);
                      }}
                      className="ml-auto cursor-pointer"
                    >
                      {item?.isPinned ? (
                        <MdOutlinePushPin className="text-cyan-400 text-xl md:text-2xl" />
                      ) : (
                        <LuPinOff className="text-gray-300 text-lg md:text-xl" />
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="w-full bg-[#e0f4ff]/20 text-gray-100 rounded-2xl p-4 mt-2 shadow-inner">
                    <p className="text-sm md:text-base lg:text-lg">
                      {item?.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};

export default AiQuestions;