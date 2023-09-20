import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import SelectSkill from './JobSeeker/SelectSkill';
import UserDashboard from './JobSeeker/UserDashboard';
import UserLogin from './JobSeeker/UserLogin';
import EmployerDashboard from './Employer/EmployerDashboard';
import EmployerLogin from './Employer/EmployerLogin';
import PostJob from './Employer/PostJob';
import ApplyForJob from './JobSeeker/ApplyForJob';
import ManageJobs from './Employer/ManageJobs';
import EditPostedJob from './Employer/EditPostedJob';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/home' element={<Navigate to={"/"} />} />
        <Route path='/user/skills' element={<SelectSkill />} />
        <Route path='/userLogin' element={<UserLogin />} />
        <Route path='/employerLogin' element={<EmployerLogin />} />
        <Route path='/jobSeekerDashboard' element={<UserDashboard />} />
        <Route path='/employerDashboard' element={<EmployerDashboard />} />
        <Route path='/postJob' element={<PostJob />} />
        <Route path='/applyJob' element={<ApplyForJob />} />

        <Route path='/manage_jobs'>
          <Route index element={<ManageJobs />}></Route>
          <Route path='edit_job' element={<EditPostedJob />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
