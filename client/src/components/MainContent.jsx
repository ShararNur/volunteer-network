import { useFetchData } from '../hooks/useFetchData';
import { apiRequest } from '../utils/apiClient';
import { Link } from 'react-router-dom';
import DataLoadingState, { EventGridSkeleton } from './DataLoadingState';

const MainContent = () => {
  const colorStyles = [
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#FFBD3E]', hover: 'hover:bg-[#cc9731]' },
    { bg: 'bg-[#3F90FC]', hover: 'hover:bg-[#3273c9]' },
    { bg: 'bg-[#FF7044]', hover: 'hover:bg-[#cc5936]' },
    { bg: 'bg-[#421FCF]', hover: 'hover:bg-[#3418a5]' },
  ];

  const { data: events, loading, error, retry } = useFetchData(async () => {
    const response = await apiRequest({ method: 'get', url: '/api/events' });
    return response.data.data ?? [];
  }, []);

  return (
    <div className="w-full min-h-screen p-6">
      <div className="container mx-auto">
        {loading && (
          <>
            <DataLoadingState variant="loading" className="py-8" />
            <EventGridSkeleton />
          </>
        )}

        {!loading && error && (
          <DataLoadingState variant="error" error={error} onRetry={retry} />
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {events?.length === 0 && (
              <p className="col-span-full text-center text-base-content/70 py-12">
                No events available yet.
              </p>
            )}
            {events?.map((event, index) => {
              const style = colorStyles[index % colorStyles.length];
              return (
                <div key={event?._id} className="flex flex-col">
                  <Link
                    to="/registration"
                    state={{ eventName: event?.title }}
                    className="card flex flex-col h-full bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
                  >
                    <div className="relative pb-60 overflow-hidden grow">
                      <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={event?.bannerUrl}
                        alt="banner image"
                      />
                    </div>

                    <button
                      type="button"
                      className={`font-semibold text-xl flex items-center justify-center w-full text-white p-4 h-24 text-center transition-all duration-500 cursor-pointer ${style.bg} ${style.hover}`}
                    >
                      {event?.title}
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
