import { useMutation } from "@tanstack/react-query";
import UseAxiosPrivate from "./useAxiosPrivate";

const usePatch = () => {
  const axiosPrivate = UseAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async ({ url, body }) => {
      return await axiosPrivate.patch(url, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
  });
  return mutation;
};

export default usePatch;
