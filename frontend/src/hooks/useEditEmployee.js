import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const editEmployee = async (employeeData, token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.put(
    `${API_BASE_URL}/employees/${employeeData.id}`,
    employeeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useEditEmployee = () => {
  const token = useAuthToken();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (employeeData) => editEmployee(employeeData, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });

  return {
    editEmployee: mutate,
    isLoading,
    isError,
    error,
  };
};

export default useEditEmployee;
