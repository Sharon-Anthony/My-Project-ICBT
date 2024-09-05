import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Home from './components/HomeComponents/Home'
import Navigationbar from './components/HomeComponents/Navigationbar'
import HomeServices from './components/HomeComponents/HomeServices'
import Banner from './components/HomeComponents/Offer'
import Facilities from './components/HomeComponents/Facilities'
import About from './components/HomeComponents/About'
import Footer from './components/HomeComponents/Footer'
import ContactUs from './components/HomeComponents/ContactUs'
import Gallery from './components/Gallery'
import HomeGallery from './components/HomeComponents/HomeGallery'
import ServiceDetail from './components/HomeComponents/ServiceDetail'
import Login from './components/HomeComponents/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './components/AdminComponents/Dashboard';
import AddUser from './components/AdminComponents/User/AddUser';
import User from './components/AdminComponents/User/User';

import UpdateUser from './components/AdminComponents/User/UpdateUser';
import AddStaff from './components/AdminComponents/Staff/AddStaff';
import Staff from './components/AdminComponents/Staff/Staff';

import StaffDashboard from './components/StaffComponents/StaffDashboard';
import StaffLayout from './components/StaffComponents/StaffLayout';
import Query from './components/StaffComponents/Query';
import Reservation from './components/StaffComponents/Reservation';
import UpdateQuery from './components/StaffComponents/UpdateQuery';
import ProtectedRoute from './components/RouteProtection/ProtectedRoute';
import MakeReservation from './components/HomeComponents/MakeReservation'
import UserDashboard from './components/UserComponents/UserDashboard';
import UserLayout from './components/UserComponents/UserLayout';
import UserReservationList from './components/UserComponents/UserReservationList';
import UpdateProfile from './components/UserComponents/Updateprofile';
import UserQuery from './components/UserComponents/UserQuery';
import UpdateuserQuery from './components/UserComponents/UpdateuserQuery';
import UserUpdateReservation from './components/UserComponents/UserUpdateReservation';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/" element={
            <>
              <Navigationbar />
              <Home id="home" />
              <HomeServices id="services" />
              <Facilities id="facilities" />
              <Banner id="banner" />
              <About id="about" />
              <HomeGallery id="gallery" />
              <ContactUs id="contactUs" />
              <Footer id="footer" />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/make-reservation" element={<MakeReservation/>} />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['a']}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-list"
          element={
            <ProtectedRoute allowedRoles={['a']}>
              <Layout>
                <User />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-list"
          element={
            <ProtectedRoute allowedRoles={['a']}>
              <Layout>
                <Staff />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateuser"
          element={
            <ProtectedRoute allowedRoles={['a']}>
              <Layout>
                <UpdateUser />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/adduser"
          element={
            <ProtectedRoute allowedRoles={['a']}>
              <Layout>
                <AddUser />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-staff"
          element={
            <ProtectedRoute allowedRoles={['a']}>
              <Layout>
                <AddStaff />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRoles={['a']}>
              <Layout>
                {/* Placeholder for Report component */}
              </Layout>
            </ProtectedRoute>
          }
        />


        {/* Staff Routes */}
<Route 
    path="/staff-dashboard" 
    element={
        <ProtectedRoute allowedRoles={['s']}>
            <StaffLayout>
                <StaffDashboard />
            </StaffLayout>
        </ProtectedRoute>
    }
/>

<Route 
    path="/reservation-list" 
    element={
        <ProtectedRoute allowedRoles={['s']}>
            <StaffLayout>
                <Reservation />
            </StaffLayout>
        </ProtectedRoute>
    }
/>

<Route 
    path="/query-list" 
    element={
        <ProtectedRoute allowedRoles={['s']}>
            <StaffLayout>
                <Query />
            </StaffLayout>
        </ProtectedRoute>
    }
/>

<Route 
    path="/query-update" 
    element={
        <ProtectedRoute allowedRoles={['s']}>
            <StaffLayout>
                <UpdateQuery />
            </StaffLayout>
        </ProtectedRoute>
    }
/>

{/* User */}
<Route 
    path="/user-dashboard" 
    element={
        <ProtectedRoute allowedRoles={['u']}>
            <UserLayout>
                <UserDashboard />
            </UserLayout>
        </ProtectedRoute>
    }
/>
<Route 
    path="/user-reservation-list" 
    element={
        <ProtectedRoute allowedRoles={['u']}>
            <UserLayout>
                <UserReservationList   />
            </UserLayout>
        </ProtectedRoute>
    }
/>
<Route 
    path="/update-profile" 
    element={
        <ProtectedRoute allowedRoles={['u']}>
            <UserLayout>
                <UpdateProfile/>
            </UserLayout>
        </ProtectedRoute>
    }
/>
<Route 
    path="/user-query-list" 
    element={
        <ProtectedRoute allowedRoles={['u']}>
            <UserLayout>
                <UserQuery />
            </UserLayout>
        </ProtectedRoute>
    }
/>
<Route 
    path="/update-user-query-list" 
    element={
        <ProtectedRoute allowedRoles={['u']}>
            <UserLayout>
                <UpdateuserQuery />
            </UserLayout>
        </ProtectedRoute>
    }
/>
<Route 
    path="/update-user-reservation-list" 
    element={
        <ProtectedRoute allowedRoles={['u']}>
            <UserLayout>
                <UserUpdateReservation />
            </UserLayout>
        </ProtectedRoute>
    }
/>

      </Routes>
    </Router>
  );
}

export default App;
