import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

/**
 * A custom react hook to fetch data using react-query and axios via a private connection
 * @param {string} url - The endpoint for the API request
 * @param {string} key - The key used by React Query for caching
 * @param {number} staleTime - Optional. The duration (in milliseconds) that extracted data can remain fresh
 * @param {boolean} ennabled - optional. Boolean that signals if query should run automatically
 * @returns {Object} The response from the API request
 */

const useFetch = (url, key, staleTime, enabled = true) => {
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: [key],
        queryFn: async () => {
            return await axiosPrivate.get(url).then((response) => response.data.data);
        },
        staleTime: staleTime || 1000 * 60 * 5,
        enabled: enabled,
    });
};

export default useFetch;
