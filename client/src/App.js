// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import TrainerProfile from './components/TrainerProfile/TrainerProfile';
import EditProfile from './components/Profile/EditProfile'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Index from './components/Index/Index';
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/index" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trainerprofile/:clientId" element={<TrainerProfile />} />
          <Route path="/edit-profile/:clientId" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
};;

export default App;