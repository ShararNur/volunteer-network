import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MainContent = () => {
  const [events, setEvents] = useState([]);

  const colorStyles = [
    // Row 1
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    // Row 2
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    // Row 3
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    // Row 4
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    // Row 5
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events`,
        );
        console.log('response', response);
        if (response.status === 200) {
          setEvents(response.data.data);
        }
      } catch (error) {
        toast.error(error.message, {
          position: 'bottom-right',
        });
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="w-full min-h-screen p-6">
      {/* Card Container Start */}

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {events.map((event, index) => {
            const style = colorStyles[index % colorStyles.length];
            return (
              <div key={event?._id} className="flex flex-col">
                <Link
                  to="/registration"
                  state={{ eventName: event?.title }}
                  className="card flex flex-col h-full bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
                >
                  <div className="relative pb-60 overflow-hidden flex-grow">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={event?.bannerUrl}
                      alt="banner image"
                    />
                  </div>

                  <button
                    className={`font-semibold text-xl flex items-center justify-center w-full text-white p-4 h-24 text-center transition-all duration-500 cursor-pointer ${style.bg} ${style.hover}`}
                  >
                    {event?.title}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
