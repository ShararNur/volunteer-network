import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const VolunteerRegisterList = () => {
  const [volunteerList, setVolunteerList] = useState([]);
  const [registrationId, setRegistrationId] = useState('');
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchVolunteerRegisterList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/volunteer-register-list`,
        );
        if (response.status === 200) {
          console.log('Volunteer Register List:', response.data);
          setVolunteerList(response?.data?.data);
        } else {
          toast.error('Failed to fetch volunteer register list', {
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.error('Error fetching volunteer register list:', error);
      }
    };
    fetchVolunteerRegisterList();
  }, [refetch]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/delete-event/${registrationId}`,
      );
      if (response.status === 200) {
        console.log('response', response);
        toast.success(response.data.message, {
          position: 'bottom-right',
        });
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      toast.error('Failed to delete registration' | error.message, {
        position: 'bottom-right',
      });
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
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white p-4 md:p-5 rounded-xl">
          <table className="table">
            {/* head */}
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
              {volunteerList.map((volunteer, index) => {
                return (
                  <tr key={index} className="hover:bg-base-300">
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
                );
              })}
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
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={handleDelete}>
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

export default VolunteerRegisterList;
