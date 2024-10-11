import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const updateRequest = async (requestId, requestData, token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.put(`${API_BASE_URL}/requests/${requestId}`, requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const useUpdateRequest = () => {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (data) => updateRequest(data.id, data.requestData, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['requests']);
    },
  });

  return { updateRequest: mutate, isLoading, isError, error };
};

export default useUpdateRequest;
