import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import DataLoadingState, { EventCardsSkeleton } from '../../components/DataLoadingState';
import Navbar from '../../components/Navbar';
import { useFetchData } from '../../hooks/useFetchData';
import { apiRequest, getApiErrorMessage } from '../../utils/apiClient';
import volunteerPic from './../../assets/images/extraVolunteer.png';

const EventTask = () => {
  const location = useLocation();
  const { email, fullName } = location.state || {};
  const [refetch, setRefetch] = useState(false);
  const [eventId, setEventId] = useState('');
  const [deleting, setDeleting] = useState(false);
  const deleteModalRef = useRef(null);

  const { data, loading, error, retry } = useFetchData(
    async () => {
      if (!email) return [];
      const response = await apiRequest({
        method: 'post',
        url: '/api/event',
        data: { email },
      });
      return response.data.data ?? [];
    },
    [refetch, email],
  );

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await apiRequest({
        method: 'delete',
        url: `/api/delete-event/${eventId}`,
      });
      if (response.status === 200) {
        deleteModalRef.current?.close();
        toast.success('Event deleted successfully', {
          position: 'bottom-right',
        });
        setRefetch((prev) => !prev);
        setEventId('');
      } else {
        toast.error('Failed to delete event', {
          position: 'bottom-right',
        });
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
    <div className="min-h-screen">
      <ToastContainer />
      <div className="mb-8">
        <Navbar fullName={fullName} />
      </div>

      {loading && (
        <>
          <DataLoadingState variant="loading" className="py-6" />
          <EventCardsSkeleton />
        </>
      )}

      {!loading && error && (
        <DataLoadingState variant="error" error={error} onRetry={retry} />
      )}

      {!loading && !error && (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          {data?.length === 0 && (
            <p className="col-span-full text-center text-base-content/70 py-12">
              No volunteer tasks found for this account.
            </p>
          )}
          {data?.map((item) => (
            <div
              className="card bg-white shadow-xl flex-col sm:flex-row"
              key={item?._id ?? item?.volunteer_task}
            >
              <figure className="p-6 sm:pr-0">
                <img
                  src={volunteerPic}
                  alt="Volunteer"
                  className="w-full sm:w-[194px] h-48 sm:h-auto object-cover rounded-xl sm:rounded-none"
                />
              </figure>
              <div className="card-body flex-1 justify-between p-6">
                <div>
                  <h2 className="card-title text-2xl font-bold mb-4">
                    {item?.volunteer_task}
                  </h2>
                  <p className="text-xl font-semibold mb-4">{item?.date}</p>
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setEventId(item?._id);
                      deleteModalRef.current?.showModal();
                    }}
                    className="btn btn-outline btn-error"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <dialog ref={deleteModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete the event</h3>
          <p className="py-4">Are you sure to delete this event?</p>
          <div className="modal-action">
            <form method="dialog" className="gap-1 flex">
              <button
                type="button"
                className="btn"
                disabled={deleting}
                onClick={() => handleDelete()}
              >
                {deleting && (
                  <span className="loading loading-spinner loading-sm" />
                )}
                Yes
              </button>
              <button type="submit" className="btn">
                No
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EventTask;
