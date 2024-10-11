import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const addRequest = async (requestData, token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.post(
    `${API_BASE_URL}/requests`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useAddRequest = () => {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (requestData) => addRequest(requestData, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    },
  });

  return {
    addRequest: mutate,
    isLoading,
    isError,
    error,
  };
};

export default useAddRequest;
