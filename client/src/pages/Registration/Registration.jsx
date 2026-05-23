import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserAuth } from '../../context/AuthContext';
import { apiRequest, getApiErrorMessage } from '../../utils/apiClient';
import logo from './../../assets/images/logo.png';

const Registration = () => {
  const location = useLocation();
  const eventName = location.state?.eventName;
  const { user } = UserAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      full_name: user?.displayName || '',
      email: user?.email || '',
      date: '',
      description: '',
      volunteer_task: eventName || '',
    },
  });
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await apiRequest({
        method: 'post',
        url: '/api/register',
        data,
      });

      if (res?.status === 201) {
        navigate('/tasks', {
          state: {
            email: data.email,
            fullName: data.full_name,
          },
        });

        toast.success(res?.data?.message, {
          position: 'bottom-right',
        });
        reset();
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error), {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-10">
      <ToastContainer />
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Volunteer Network" className="w-48 my-6" />
      </Link>

      <div className="card w-full max-w-lg bg-white shadow-xl border border-[#ABABAB]">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-base-content mb-5">
            Register as a Volunteer
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="floating-label">
                <span className="text-base label-text">Full Name</span>
                <input
                  type="text"
                  {...register('full_name', { required: true })}
                  placeholder="Enter your full name"
                  className="input w-full input-bordered"
                />
              </label>
            </div>

            <div>
              <label className="floating-label">
                <span className="text-base label-text">Username or Email</span>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div>
              <label className="floating-label">
                <span className="text-base label-text">Date</span>
                <input
                  type="date"
                  {...register('date', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter your date"
                />
              </label>
            </div>

            <div>
              <label className="floating-label">
                <span className="text-base label-text">Description</span>
                <input
                  type="text"
                  {...register('description')}
                  placeholder="Enter your description"
                  className="input input-bordered w-full"
                  autoComplete="NA"
                />
              </label>
            </div>

            <div>
              <label className="floating-label">
                <span className="text-base label-text">Event Task</span>
                <input
                  type="text"
                  {...register('volunteer_task', { required: true })}
                  placeholder="Enter your event task"
                  className="input input-bordered w-full"
                  autoComplete="NA"
                />
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                {isSubmitting ? 'Submitting...' : 'Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
