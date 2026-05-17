import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import volunteerPic from './../../assets/images/extraVolunteer.png';

const EventTask = () => {
  const location = useLocation();
  const { email, fullName } = location.state || {}; // Extract email from location state if available
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [eventId, setEventId] = useState('');
  console.log('location', location);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/event`,
          {
            email: email,
          },
        );
        if (response.status === 200) {
          console.log('data', response.data.data);
          setData(response.data.data);
        } else {
          toast.error('Failed to load event details', {
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [refetch, email]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/delete-event/${eventId}`,
      );
      if (response.status === 200) {
        toast.success('Event deleted successfully', {
          position: 'bottom-right',
        });
        // Refresh the event details after deletion
        setRefetch((prev) => !prev); // Toggle refetch to trigger useEffect
        setEventId(''); // Clear the eventId after deletion
      } else {
        toast.error('Failed to delete event', {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="mb-8">
        <Navbar fullName={fullName} />
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        {data.map((item) => (
          <div
            className="card bg-white shadow-xl flex-col sm:flex-row"
            key={item}
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
                  onClick={() => {
                    document.getElementById('my_modal_1').showModal();
                    setEventId(item?._id);
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete the event</h3>
          <p className="py-4">Are you sure to delete this event?</p>
          <div className="modal-action">
            <form method="dialog" className="gap-1 flex">
              <button className="btn" onClick={() => handleDelete()}>
                Yes
              </button>
              <button className="btn">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EventTask;
