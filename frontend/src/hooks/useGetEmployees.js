import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const fetchEmployees = async (token, page = 1, limit = 10) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.get(`${API_BASE_URL}/employees`, {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const useGetEmployees = (page, limit = 10) => {
  const token = useAuthToken();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['employees', page, limit],
    queryFn: () => fetchEmployees(token, page, limit),
    enabled: !!token,
  });

  return {
    employees: data?.employees || [],
    totalEmployees: data?.totalItems || 0,
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || 1,
    isLoading,
    isError,
    error,
  };
};

export default useGetEmployees;
