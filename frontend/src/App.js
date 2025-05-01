// src/App.js
import React, {useEffect} from 'react';
import './App.css';
import Activity from './pages/activity/Activity';
import Login from './pages/login/Login';
import Reset from './pages/reset/Reset';
import ScoreboardList from './pages/scoreboard/ScoreboardList';

import {Route, BrowserRouter as Router, Routes, Outlet, Navigate, useNavigate} from 'react-router-dom';
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

const sections = [
  { id: 1, name: 'Šahovska sekcija', description: 'Igramo šah', to:"/profile" },
  { id: 2, name: 'Neka druga sekcija', description: 'Igramo nešto drugo', to:"/profile" },
  // Add more sections as needed
];

const PrivateRoute = () => {
  const {user} = useAuth();
  return user ? <Outlet /> : <Navigate to='/login' replace />
}

const AdminRoute = () => {
  const {user} = useAuth();
  const {sectionRole} = useSection();
  return (user && sectionRole==="admin") ? <Outlet /> : <Navigate to="/login" />
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
              <Route path="/scoreboard/league" element={<Scoreboard name={"Liga"} description={"Bodovi u Ligi"}/>} />

              <Route path="/news" element={<News />} />
              <Route path="/post/:id" element={<Post />} />

              <Route path="/section/:id" element={<Section />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/points' element={<PointsOptions />} />
              <Route path='/admin/points/automatic' element={<AutomaticPoints  />} />
              <Route path='/admin/points/manual' element={<ManualPoints  />} />
              <Route path='/admin/events' element={<EventsOptions  />} />
              <Route path='/admin/events/add' element={<AddEvent  />} />
              <Route path='/admin/events/all' element={<AllEvents  />} />
              <Route path='/admin/events/:id' element={<AdminEvent  />} />
              <Route path='/admin/all-users' element={<AllUsers  />} />
            </Route>


            <Route path="/superadmin" element={<Superadmin />} />

            <Route path="/superadmin/sections" element={<SectionsOptions />} />
            <Route path="/superadmin/sections/add" element={<AddSection />} />
            <Route path="/superadmin/sections/all" element={<AllSections />} />
            <Route path="/superadmin/sections/:id" element={<AdminSection />} />
            <Route path="/superadmin/sections/:id/edit" element={<AddSection />} />
            <Route path="/superadmin/sections/:id/add-admin" element={<AddAdmin />} />

            <Route path="/superadmin/semesters" element={<SemestersOptions />} />
            <Route path="/superadmin/semesters/add" element={<AddSemester />} />
            <Route path="/superadmin/semesters/all" element={<AllSemesters />} />
            <Route path="/superadmin/semesters/:id" element={<AddSemester />} />




          </Routes>
        </Router>
      </SectionProvider>
      </AuthProvider>
  );
}

export default App;
