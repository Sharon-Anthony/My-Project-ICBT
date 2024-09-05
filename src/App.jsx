import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navigationbar';
import Home from './components/Home';
import Services from './components/Services/Services';
import AddService from './components/Services/AddServices';
import Service from './components/Services/Service';
import HomeServices from './components/Services/HomeServices';
import Reserviation from './components/Services/Reserviation';
import Query from './components/Services/Query';
// 
function App() {
  return (
    <div>
  <AddService/>
  
        <Routes>
          {/* <Route path="/" element={<Reserviation />} /> */}
      
      <Route path="/" element={<HomeServices />} />
      <Route path="services/:serviceId" element={<Service />} />
      <Route path="/reservation" element={<Reserviation />} />
      <Route path="/makequery" element={<Query />} />
      
    </Routes>
      
    </div>
  
  );
}

export default App;
