import { useMutation } from "@tanstack/react-query";
import UseAxiosPrivate from "./useAxiosPrivate";

const usePost = () => {
  const axiosPrivate = UseAxiosPrivate();

  // return useMutation({
  //   mutationFn: async ({ url, body }) => {
  //     const result = await axiosPrivate.post(url, JSON.stringify(body), {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     });
  //     console.log("result", result);
  //     return result.data;
  //   },
  // });
  // return mutation;
};

export default usePost;

export const useAddUserMutation = () => {
  const axiosPrivate = UseAxiosPrivate();

  return useMutation({
    mutationFn: async ({ url, body }) => {
      const result = await axiosPrivate.post(url, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("result", result);
      return result.data;
    },
  });
};
