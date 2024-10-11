import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const fetchRequests = async (token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.get(`${API_BASE_URL}/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.requests;
};

const useGetRequests = () => {
  const token = useAuthToken();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['requests'],
    queryFn: () => fetchRequests(token),
    enabled: !!token,
  });

  return {
    requests: data,
    isLoading,
    isError,
    error,
  };
};

export default useGetRequests;
