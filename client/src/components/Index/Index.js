import React from 'react';
import ClientHome from '../ClientHome/ClientHome';
import Navigation from '../NavigationBar/NavigationBar';
import WorkoutSummary from '../../components/ClientHome/WorkoutSummary';
import ProgressChart from '../../components/ClientHome/ProgressChart';
import UpcomingWorkouts from '../../components/ClientHome/UpcomingWorkouts';

//import logo from './logo.svg';
import './Index.css'; // External CSS for overall styling


const Index = () => {
  return (
    <div className="app">
      <ClientHome/>
      <Navigation />
      <WorkoutSummary />
      <ProgressChart />
      <UpcomingWorkouts />
    </div>
     );
};

export default Index;