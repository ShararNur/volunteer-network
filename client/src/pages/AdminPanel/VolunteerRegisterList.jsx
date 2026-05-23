import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import DataLoadingState, { TableRowsSkeleton } from '../../components/DataLoadingState';
import { useFetchData } from '../../hooks/useFetchData';
import { apiRequest, getApiErrorMessage } from '../../utils/apiClient';

const VolunteerRegisterList = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [refetch, setRefetch] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: volunteerList, loading, error, retry } = useFetchData(
    async () => {
      const response = await apiRequest({
        method: 'get',
        url: '/api/volunteer-register-list',
      });
      return response?.data?.data ?? [];
    },
    [refetch],
  );

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await apiRequest({
        method: 'delete',
        url: `/api/delete-event/${registrationId}`,
      });
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: 'bottom-right',
        });
        setRefetch((prev) => !prev);
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err), {
        position: 'bottom-right',
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="h-full w-full">
      <ToastContainer />
      <div className="w-full p-4 md:p-6 bg-white">
        <h3 className="font-medium text-xl md:text-2xl text-neutral-950">
          Volunteer register list
        </h3>
      </div>

      <div className="bg-[#F4F7FC] px-4 md:px-6 pt-6 pb-20 overflow-hidden">
        {error && !loading && (
          <DataLoadingState variant="error" error={error} onRetry={retry} />
        )}

        <div
          className={`overflow-x-auto rounded-box border border-base-content/5 bg-white p-4 md:p-5 rounded-xl ${error && !loading ? 'hidden' : ''}`}
        >
          {loading && (
            <DataLoadingState variant="loading" className="py-6" />
          )}
          <table className="table">
            <thead className="bg-[#F5F6FA]">
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Registration Date</th>
                <th>Volunteer List</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableRowsSkeleton />}
              {!loading &&
                volunteerList?.map((volunteer, index) => (
                  <tr key={volunteer?._id ?? index} className="hover:bg-base-300">
                    <td>{volunteer?.full_name}</td>
                    <td>{volunteer?.email}</td>
                    <td>{volunteer?.date}</td>
                    <td>{volunteer?.volunteer_task}</td>
                    <td>
                      <Trash2
                        color="red"
                        className="cursor-pointer"
                        onClick={() => {
                          setRegistrationId(volunteer?._id);
                          document.getElementById('delete-modal').showModal();
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete this registration?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                className="btn"
                onClick={handleDelete}
              >
                {deleting && (
                  <span className="loading loading-spinner loading-sm" />
                )}
                Yes
              </button>
              <button className="btn">
                No
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default VolunteerRegisterList;
