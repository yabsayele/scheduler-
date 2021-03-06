import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { addScheduleTimes } from './utilities/times';
import { useData } from './utilities/firebase';
import './App.css';


const App = () => {
  // const [schedule, setSchedule] = useState();
  // const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  // useEffect(() => {
  //   const fetchSchedule = async () => {
  //     const response = await fetch(url);
  //     if (!response.ok) throw response;
  //     const json = await response.json();
  //     setSchedule(addScheduleTimes(json));
  //   }
  //   fetchSchedule();
  // }, []);

  // if (!schedule) return <h1>Loading schedule...</h1>;

  const [schedule, loading, error] = useData('/', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>


  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;
