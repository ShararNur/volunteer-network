import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import logo from './../../assets/images/logo.png';

const Login = () => {
  const { user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      googleSignIn();
    } catch (error) {
      console.error('Google Sign in error', error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate('/registration');
    }
  }, [user, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center px-10">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Volunteer Network" className="w-48 my-6" />
      </Link>
      <div className="w-full max-w-md mx-auto py-16 md:py-32 overflow-hidden bg-white rounded-md shadow-xl border border-[#ABABAB]">
        <div className="px-6 md:px-12 py-4">
          <h3 className="text-2xl font-bold text-center text-black mb-7">
            Login With
          </h3>

          <button
            className="btn btn-block btn-lg bg-white text-black border-[#e5e5e5] rounded-full"
            onClick={handleGoogleLogin}
          >
            <svg
              className="w-6 h-6 mx-2"
              aria-label="Google logo"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            <span className="text-base font-medium">Continue with Google</span>
          </button>
        </div>

        <div className="flex items-center justify-center py-1 text-center">
          <span className=" text-black font-medium">
            Don't have an account?
          </span>

          <a href="#" className="mx-1 font-medium text-[#3F90FC] underline">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
