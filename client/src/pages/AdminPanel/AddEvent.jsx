import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const AddEvent = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('data', data.bannerImage[0]);
    const formData = new FormData();
    formData.append('eventTitle', data.eventTitle);
    formData.append('eventDescription', data.eventDescription);
    formData.append('eventDate', data.eventDate);
    formData.append('bannerImage', data.bannerImage[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/add-event`,
        formData,
      );
      console.log('response', response);
      if (response.status === 201) {
        toast.success(response?.data?.message, {
          position: 'bottom-right',
        });
        reset();
        return;
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="h-screen w-full">
      <ToastContainer />
      <div className="bg-white p-4 md:p-6 w-full">
        <h3 className="font-medium text-xl md:text-2xl text-neutral-950">
          Add Event
        </h3>
      </div>

      <div className="bg-[#F4F7FC] h-full pt-6 md:pt-10 px-4 md:px-6 pb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shadow-sm flex flex-col md:flex-row p-4 md:p-7 rounded-xl gap-4 md:gap-0">
            {/* register your input into the hook by invoking the "register" function */}
            <div className="w-full md:w-1/2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Event Title</legend>
                <input
                  type="text"
                  className="input w-full md:w-10/12"
                  placeholder="Enter Title"
                  {...register('eventTitle', { required: true })}
                />
              </fieldset>
              {errors.eventTitle && <span>This field is required</span>}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Event Description</legend>
                <textarea
                  placeholder="Enter Description"
                  className="textarea w-full md:w-10/12"
                  required
                  {...register('eventDescription', { required: true })}
                />
                {errors.eventDescription && <span>This field is required</span>}
              </fieldset>
            </div>

            <div className="w-full md:w-1/2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Event Date</legend>
                <input
                  type="date"
                  className="input w-full md:w-11/12"
                  placeholder="Select Date"
                  required
                  {...register('eventDate', { required: true })}
                />
                {errors.eventDate && <span>This field is required</span>}
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Banner</legend>
                <input
                  type="file"
                  className="file-input"
                  {...register('bannerImage', { required: true })}
                />
                {errors.bannerImage && <span>This field is required</span>}
              </fieldset>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary mt-3 px-7"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
