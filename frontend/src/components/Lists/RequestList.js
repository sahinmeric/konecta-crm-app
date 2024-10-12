import React from 'react';
import { useState } from 'react';
import RequestCard from '../Cards/RequestCard';
import useDeleteRequest from '../../hooks/useDeleteRequest';
import useUpdateRequest from '../../hooks/useUpdateRequest';
import EditRequestModal from '../Modals/EditRequestModal';

const RequestList = ({ requests, employees, isAdmin }) => {
  const { deleteRequest, isLoading: isDeleting, isError: isDeleteError, error: deleteError } = useDeleteRequest();
  const { updateRequest, isLoading: isEditing, isError: isEditError, error: editError } = useUpdateRequest();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  const handleDeleteRequest = (requestId) => {
    deleteRequest(requestId);
  };

  const handleEditRequest = (request) => {
    setCurrentRequest(request);
    setEditModalOpen(true);
  };

  const handleSubmitEdit = (updatedData) => {
    if (currentRequest) {
      updateRequest({ id: currentRequest.id, requestData: updatedData });
      setEditModalOpen(false);
      setCurrentRequest(null);
    }
  };

  if (requests.length === 0) {
    return <div>No requests found</div>;
  }

  return (
    <div>
      {isDeleting && <div>Deleting request...</div>}
      {isDeleteError && <div>Error: {deleteError.message}</div>}
      {isEditing && <div>Updating request...</div>}
      {isEditError && <div>Error: {editError.message}</div>}
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onDelete={handleDeleteRequest}
          onEdit={handleEditRequest}
          isAdmin={isAdmin}
        />
      ))}
      <EditRequestModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        request={currentRequest}
        employees={employees}
        onSubmit={handleSubmitEdit}
      />
    </div>
  );
};

export default RequestList;
