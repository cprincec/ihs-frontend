import { useMutation } from "@tanstack/react-query";
import UseAxiosPrivate from "./useAxiosPrivate";

const useDelete = () => {
  const axiosPrivate = UseAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (url) => await axiosPrivate.delete(url),
  });
  return mutation;
};

export default useDelete;
