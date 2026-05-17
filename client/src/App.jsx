import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import AddEvent from './pages/AdminPanel/AddEvent.jsx';
import EventTask from './pages/EventTask/EventTask';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import PrivateRoute from './utils/PrivateRoute.jsx';
const VolunteerRegisterList = lazy(
  () => import('./pages/AdminPanel/VolunteerRegisterList'),
);
const Home = lazy(() => import('./pages/Home/Home'));

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="text-9xl text-red-600">Loading...</div>
                }
              >
                <Home />
              </Suspense>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/registration"
            element={
              <PrivateRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <Registration />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/tasks" element={<EventTask />}></Route>
          <Route path="/" element={<Layout />}>
            <Route
              path="admin-panel/volunteer-register-list"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <VolunteerRegisterList />
                </Suspense>
              }
            />
            <Route
              path="admin-panel/add-event"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AddEvent />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
