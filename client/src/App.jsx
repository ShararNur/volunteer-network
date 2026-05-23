import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import './App.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
const Layout = lazy(() => import('./components/Layout.jsx'));
const AddEvent = lazy(() => import('./pages/AdminPanel/AddEvent.jsx'));
const EventTask = lazy(() => import('./pages/EventTask/EventTask'));
const Login = lazy(() => import('./pages/Login/Login'));
const PrivateRoute = lazy(() => import('./utils/PrivateRoute.jsx'));
const Registration = lazy(() => import('./pages/Registration/Registration'));
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
                  <div className="h-screen w-full flex items-center justify-center">
                    <HashLoader />
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <div className="h-screen w-full flex items-center justify-center">
                    <HashLoader />
                  </div>
                }
              >
                <Login />
              </Suspense>
            }
          ></Route>
          <Route
            path="/registration"
            element={
              <PrivateRoute>
                <Suspense
                  fallback={
                    <div className="h-screen w-full flex items-center justify-center">
                      <HashLoader />
                    </div>
                  }
                >
                  <Registration />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/tasks"
            element={
              <Suspense
                fallback={
                  <div className="h-screen w-full flex items-center justify-center">
                    <HashLoader />
                  </div>
                }
              >
                <EventTask />
              </Suspense>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="h-screen w-full flex items-center justify-center">
                    <HashLoader />
                  </div>
                }
              >
                <Layout />
              </Suspense>
            }
          >
            <Route
              path="admin-panel/volunteer-register-list"
              element={
                <Suspense
                  fallback={
                    <div className="h-screen w-full flex items-center justify-center">
                      <HashLoader />
                    </div>
                  }
                >
                  <VolunteerRegisterList />
                </Suspense>
              }
            />
            <Route
              path="admin-panel/add-event"
              element={
                <Suspense
                  fallback={
                    <div className="h-screen w-full flex items-center justify-center">
                      <HashLoader />
                    </div>
                  }
                >
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
