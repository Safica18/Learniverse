import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Index from './pages/Index';
import Register from './pages/Register';
import StudentRegister from './pages/StudentRegister';
import TeacherReg from './pages/TeacherReg';
import ParentReg from './pages/ParentReg';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';  
import ParentLogin from './pages/ParentLogin';
import StudentPortal from './pages/StudentPortal';
import StudentKS1Dash from './pages/StudentKS1Dash';
import StudentKS2Dash from './pages/StudentKS2Dash';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AvatarKS1 from './pages/AvatarKS1';
import KS1Easy from './pages/KS1Easy';

import AvatarKS2 from './pages/AvatarKS2';
import ScoreKS1 from './pages/ScoreKS1';
import KS1Medium from './pages/KS1Medium';
import KS1Hard from './pages/KS1Hard';
import Leaderboard from './pages/Leaderboard';
import KS2Easy from './pages/KS2Easy';
import KS2Medium from './pages/KS2Medium';
import KS2Hard from './pages/KS2Hard';
import ViewStudents from './pages/ViewStudents';
import InstructionEasyKS1 from './pages/InstructionEasyKS1';
import InstructionMediumKS1 from './pages/InstructionMediumKS1';
import InstructionHardKS1 from './pages/InstructionHardKS1';
import InstructionEasyKS2 from './pages/InstructionEasyKS2';
import InstructionMediumKS2 from './pages/InstructionMediumKS2';
import InstructionHardKS2 from './pages/InstructionHardKS2';
import ScoreKS2 from './pages/ScoreKS2';
import AssignHomework from './pages/AssignHomework';
import LeaderboardKS2 from './pages/LeaderboardKS2';

// future deployment pages
import KS1Writing from './pages/KS1Writing';
import KS1Science from './pages/KS1Science';
import KS2Writing from './pages/KS2Writing';
import KS2Science from './pages/KS2Science';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/parentlogin" element={<ParentLogin />} />

        <Route path="/register" element={<Register />} />
        <Route path="/studentregister" element={<StudentRegister />} />
        <Route path="/teacherregister" element={<TeacherReg />} />
        <Route path="/parentregister" element={<ParentReg />} />

        {/* Student Portal */}
        <Route path="/portal" element={<StudentPortal />} />

        {/* Parent Dashboard */}
        <Route path="/parentDash" element={<ParentDashboard />} />

        

        {/* Teacher dashboard */}
       <Route path="/teacherDashboard" element={<TeacherDashboard />} />
       <Route path="/viewstudents" element={<ViewStudents/>} />


      <Route path="/AvatarKS1" element={<AvatarKS1 />} />
      <Route path="/AvatarKS2" element={<AvatarKS2 />} />

        {/* Key Stages pages */}
        <Route path="/homeKS1" element={<StudentKS1Dash />} />
        <Route path="/homeKS2" element={<StudentKS2Dash />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/LeaderboardKS2" element={<LeaderboardKS2 />} />


        {/* Games Path (Subjects) */}

         
          <Route path="/KS1Easy" element={<KS1Easy/>} />
        <Route path="/KS1Medium" element={<KS1Medium />} />
        <Route path="/KS1Hard" element={<KS1Hard/>} />

         <Route path="/KS2Easy" element={<KS2Easy />} />
          <Route path="/KS2Medium" element={<KS2Medium />} />
           <Route path="/KS2Hard" element={<KS2Hard />} />

           <Route path="/InstructionEasyKS1" element={<InstructionEasyKS1 />} />
           <Route path="/InstructionMediumKS1" element={<InstructionMediumKS1 />} />
           <Route path="/InstructionHardKS1" element={<InstructionHardKS1 />} />
          <Route path="/InstructionEasyKS2" element={<InstructionEasyKS2 />} />
          <Route path="/InstructionMediumKS2" element={<InstructionMediumKS2 />} />
          <Route path="/InstructionHardKS2" element={<InstructionHardKS2 />} />
       <Route path="/AssignHomework" element={<AssignHomework />} />

       
        
        <Route path="/ScoreKS1" element={<ScoreKS1/>} /> 
        <Route path="/ScoreKS2" element={<ScoreKS2/>} /> 

        {/* future implementation pages */}
        <Route path="/KS2Writing" element={<KS2Writing />} />
        <Route path="/KS1Writing" element={<KS1Writing />} />
        <Route path="/KS1Science" element={<KS1Science />} />
        <Route path="/KS2Science" element={<KS2Science />} />

      </Routes>
    </Router>
  );
}

export default App;
