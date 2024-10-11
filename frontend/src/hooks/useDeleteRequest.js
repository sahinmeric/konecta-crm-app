import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const deleteRequest = async (requestId, token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.delete(`${API_BASE_URL}/requests/${requestId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const useDeleteRequest = () => {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (requestId) => deleteRequest(requestId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    },
  });

  return {
    deleteRequest: mutate,
    isLoading,
    isError,
    error,
  };
};

export default useDeleteRequest;
