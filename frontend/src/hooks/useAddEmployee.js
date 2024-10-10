import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthToken from './useAuthToken';

const addEmployee = async (employeeData, token) => {
  if (!token) {
    throw new Error('Unauthorized, no token found.');
  }

  const response = await axios.post(
    `${API_BASE_URL}/employees`,
    employeeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useAddEmployee = () => {
  const token = useAuthToken();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (employeeData) => addEmployee(employeeData, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });

  return {
    addEmployee: mutate,
    isLoading,
    isError,
    error,
  };
};

export default useAddEmployee;
