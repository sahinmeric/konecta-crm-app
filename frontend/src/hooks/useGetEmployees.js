import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const fetchEmployees = async (token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.get(`${API_BASE_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.employees;
};

const useGetEmployees = () => {
  const token = useAuthToken();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['employees'],
    queryFn: () => fetchEmployees(token),
    enabled: !!token,
  });

  return {
    employees: data,
    isLoading,
    isError,
    error,
  };
};

export default useGetEmployees;
