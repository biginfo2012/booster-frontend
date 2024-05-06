import useAxios from "./useAxiosHook";

const useApi = () => {
  const [{ data, loading, error, response }, executeGet] = useAxios(
    {},
    {
      manual: true
    }
  );
  const execute = async (code: number) => {
    return executeGet({
      method: "GET",
      url: "/status/" + code
    });
  };
  return { data, loading, error, response, execute };
};

export default useApi;
