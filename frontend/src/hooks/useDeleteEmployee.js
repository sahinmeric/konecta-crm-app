import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const deleteEmployee = async (employeeId, token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.delete(`${API_BASE_URL}/employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const useDeleteEmployee = () => {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (employeeId) => deleteEmployee(employeeId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });

  return {
    deleteEmployee: mutate,
    isLoading,
    isError,
    error,
  };
};

export default useDeleteEmployee;
