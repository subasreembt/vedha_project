import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";

import Home from "./component/Home";

import StudentTable from "./component/StudentTable";



const MasterHome = () => {
  return (
    <>
      <title>Home</title>
      <Navbar/>
      <Home/>
 
   
    </>
  );
};


const MasterStudent = () => {
  return (
    <>
      <title>student</title>
      <Navbar/>
   <StudentTable/>
    </>
  );
};







const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MasterHome />} />
        <Route exact path="/student" element={<MasterStudent />} />
       
      </Routes>
    </>
  );
};

export default App;
