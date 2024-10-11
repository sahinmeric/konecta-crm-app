import React from 'react';
import RequestCard from './RequestCard';
import useDeleteRequest from '../hooks/useDeleteRequest';

const RequestList = ({ requests }) => {
  const { deleteRequest, isLoading, isError, error } = useDeleteRequest();

  const handleDeleteRequest = (requestId) => {
    deleteRequest(requestId);
  };

  if (requests.length === 0) {
    return <div>No requests found</div>;
  }

  return (
    <div>
      {isLoading && <div>Deleting request...</div>}
      {isError && <div>Error: {error.message}</div>}
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onDelete={handleDeleteRequest}
        />
      ))}
    </div>
  );
};

export default RequestList;
