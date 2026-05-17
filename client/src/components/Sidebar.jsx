import { Plus, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from './../assets/images/logo.png';

const Sidebar = () => {
  return (
    <div className="p-5 bg-white w-full md:w-64 min-h-auto md:min-h-screen shadow-sm z-10">
      <Link
        to="/"
        className="flex items-center justify-center md:justify-start"
      >
        <img src={logo} className="w-40 md:w-48" alt="logo" />
      </Link>

      <ul className="menu bg-white rounded-box w-full mt-6 md:mt-9 text-zinc-950 flex-row md:flex-col justify-center gap-2">
        <li>
          <Link to="/admin-panel/volunteer-register-list">
            <UsersRound size={18} />
            Volunteer register list
          </Link>
        </li>
        <li>
          <Link to="/admin-panel/add-event">
            <Plus />
            Add event
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
