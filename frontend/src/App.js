// src/App.js
import React from 'react';
import './App.css';
import Activity from './pages/activity/Activity';
import Login from './pages/login/Login';
import Reset from './pages/reset/Reset';
import ScoreboardList from './pages/scoreboard/ScoreboardList';

import {Route, BrowserRouter as Router, Routes, Outlet, Navigate} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Profile from './pages/profile/Profile';
import Scoreboard from './pages/scoreboard/Scoreboard';
import Registration from './pages/registration/Registration';
import News from './pages/news/News';
import About from './pages/about/About';
import Section from './pages/section/Section';
import Join from './pages/join/Join';
import Post from './pages/post/Post';
import Admin from './pages/admin/Admin';
import AutomaticPoints from './pages/admin/points/AutomaticPoints';
import AddEvent from './pages/admin/events/AddEvent';
import AllUsers from './pages/admin/users/AllUsers';
import EnrolledSections from "./pages/enrolled/EnrolledSections";
import {AuthProvider, useAuth} from "./contexts/AuthProvider";
import {SectionProvider, useSection} from "./contexts/SectionProvider";
import PointsOptions from "./pages/admin/points/PointsOptions";
import ManualPoints from "./pages/admin/points/ManualPoints";
import EventsOptions from "./pages/admin/events/EventsOptions";
import AllEvents from "./pages/admin/events/AllEvents";
import AdminEvent from "./pages/admin/events/Event";
import Superadmin from "./pages/superadmin/Superadmin";
import SemestersOptions from "./pages/superadmin/semesters/SemestersOptions";
import AddSemester from "./pages/superadmin/semesters/AddSemester";
import AllSemesters from "./pages/superadmin/semesters/AllSemesters";
import SectionsOptions from "./pages/superadmin/sections/SectionsOptions";
import AddSection from "./pages/superadmin/sections/AddSection";
import AllSections from "./pages/superadmin/sections/AllSections";
import AdminSection from "./pages/superadmin/sections/AdminSection";
import AddAdmin from "./pages/superadmin/sections/AddAdmin";
import UsersOptions from "./pages/admin/users/UsersOptions";
import PassUsers from "./pages/admin/users/PassUsers";
import UsersSelection from "./pages/admin/users/UsersSelection";
import AdminUser from "./pages/admin/users/User";
import Spinner from "./components/spinner/Spinner";
import AddUsersMultiple from "./pages/admin/users/AddUsersMultiple";

const PrivateRoute = () => {
  const {user, loading} = useAuth();
  const {sectionId, sectionRole, fetchSectionRole} = useSection();
  if (user && sectionId && !sectionRole) {
    fetchSectionRole(user.id);
  }
  if (loading) {
    return <Spinner />
  }

  return user ? <Outlet /> : <Navigate to='/login' replace />
}

const AdminRoute = () => {
  const {user, loading} = useAuth();
  const {sectionId, sectionRole, fetchSectionRole, roleLoading} = useSection();

  if (user && sectionId && !sectionRole) {
    fetchSectionRole(user.id);
  }
  if (!user && !loading) {
    return <Navigate to={"/login"} />
  }
  if (loading || roleLoading) {
    return <Spinner />
  }
  return (user && sectionRole==="admin") ? <Outlet /> : <Navigate to="/login" />
}

const SuperAdminRoute = () => {
  const {user, loading} = useAuth();
  const {sectionId, sectionRole, fetchSectionRole, roleLoading} = useSection();

  if (user && sectionId && !sectionRole) {
    fetchSectionRole(user.id);
  }
  if (!user && !loading) {
    return <Navigate to={"/login"} />
  }
  if (loading || roleLoading) {
    return <Spinner />
  }
  return (user && sectionRole==="superadmin") ? <Outlet /> : <Navigate to="/login" />
}

function App() {

  return (
      <AuthProvider>
      <SectionProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/about" element={<About />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/my-sections" element={<EnrolledSections />} />
              <Route path="/join" element={<Join />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/activity" element={<Activity />} />

              <Route path="/scoreboard" element={<ScoreboardList />} />
              <Route path="/scoreboard/semester" element={<Scoreboard name={"Semester"} description={"Bodovi u semestru"} />} />
              <Route path="/scoreboard/year" element={<Scoreboard name={"Year"} description={"Bodovi ove godine"} />} />
              <Route path="/scoreboard/total" element={<Scoreboard name={"Total"} description={"Svi bodovi ikad"}/>} />

              <Route path="/news" element={<News />} />
              <Route path="/post/:id" element={<Post />} />

              <Route path="/section/:id" element={<Section />} />
            </Route>

            <Route element={<AdminRoute />} path='/admin'>
              <Route path='' element={<Admin />} />
              <Route path='points' element={<PointsOptions />} />
              <Route path='points/automatic' element={<AutomaticPoints  />} />
              <Route path='points/manual' element={<ManualPoints  />} />
              <Route path='points/manual/:eventId/:memberId' element={<ManualPoints  />} />
              <Route path='events' element={<EventsOptions  />} />
              <Route path='events/add' element={<AddEvent  />} />
              <Route path='events/all' element={<AllEvents  />} />
              <Route path='events/:id' element={<AdminEvent  />} />
              <Route path='users' element={<UsersOptions  />} />
              <Route path='users/all' element={<AllUsers  />} />
              <Route path='users/:id' element={<AdminUser  />} />
              <Route path='users/pass' element={<PassUsers  />} />
              <Route path='users/selection' element={<UsersSelection  />} />
              <Route path='users/add/many' element={<AddUsersMultiple  />} />
            </Route>

            <Route element={<SuperAdminRoute />} path="/superadmin">
              <Route path="" element={<Superadmin />} />
              <Route path="sections" element={<SectionsOptions />} />
              <Route path="sections/add" element={<AddSection />} />
              <Route path="sections/all" element={<AllSections />} />
              <Route path="sections/:id" element={<AdminSection />} />
              <Route path="sections/:id/edit" element={<AddSection />} />
              <Route path="sections/:id/add-admin" element={<AddAdmin />} />

              <Route path="semesters" element={<SemestersOptions />} />
              <Route path="semesters/add" element={<AddSemester />} />
              <Route path="semesters/all" element={<AllSemesters />} />
              <Route path="semesters/:id" element={<AddSemester />} />
            </Route>






          </Routes>
        </Router>
      </SectionProvider>
      </AuthProvider>
  );
}

export default App;
