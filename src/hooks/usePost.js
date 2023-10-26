import { useMutation } from "@tanstack/react-query";
import UseAxiosPrivate from "./useAxiosPrivate";

const usePost = () => {
  const axiosPrivate = UseAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async ({ url, body }) => {
      return await axiosPrivate.post(url, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
  });
  return mutation;
};

export default usePost;
