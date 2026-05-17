import { Link, useLocation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import NavBrand from './../assets/images/logo.png';

const Navbar = ({ fullName }) => {
  const location = useLocation();
  const { user, logOut } = UserAuth();

  return (
    <div className="navbar px-4 py-4 md:py-8 md:px-12 flex justify-between items-center">
      {/* Logo */}
      <div className="navbar-start w-auto">
        <Link to="/" className="flex items-center">
          <img
            src={NavBrand}
            alt="Volunteer Network"
            className="w-32 md:w-48"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-end w-auto flex justify-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 text-[#0B0B0B] mr-4">
            <li>
              <Link to="/" className="font-medium text-base">
                Home
              </Link>
            </li>
            <li>
              <a className="font-medium text-base">Donation</a>
            </li>
            <li>
              <a className="font-medium text-base">Events</a>
            </li>
            <li>
              <a className="font-medium text-base">Blog</a>
            </li>
            {location.pathname === '/tasks' && (
              <li>
                <span className="font-bold text-base">{fullName}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Right Section - Register & Admin Buttons / Mobile Menu Toggle */}
        <div className="flex gap-1 md:gap-2 items-center">
          {location.pathname !== '/tasks' && (
            <div className="hidden sm:flex gap-1 md:gap-2">
              <Link
                to="/registration"
                className="btn btn-primary btn-sm md:btn-md normal-case"
              >
                Register
              </Link>
              <Link
                to="/admin-panel/volunteer-register-list"
                className="btn btn-neutral btn-sm md:btn-md normal-case"
              >
                Admin
              </Link>
            </div>
          )}

          {user && (
            <div className="flex gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={logOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile dropdown */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a>Donation</a>
              </li>
              <li>
                <a>Events</a>
              </li>
              <li>
                <a>Blog</a>
              </li>
              {location.pathname === '/tasks' && (
                <li>
                  <span className="font-bold">{fullName}</span>
                </li>
              )}
              {location.pathname !== '/tasks' && (
                <div className="sm:hidden flex flex-col gap-2 mt-2 px-2">
                  <Link
                    to="/registration"
                    className="btn btn-primary btn-sm normal-case w-full"
                  >
                    Register
                  </Link>
                  <Link
                    to="/admin-panel/volunteer-register-list"
                    className="btn btn-neutral btn-sm normal-case w-full"
                  >
                    Admin
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
