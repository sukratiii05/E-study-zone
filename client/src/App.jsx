import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AddSkills from './pages/trainer/AddSkills'
import Content from './pages/trainer/Content'
import Profile from './pages/trainer/Profile'
import Handshake from './pages/trainer/Handshake'
import TrainerChangePassword from './pages/trainer/TrainerChangePassword'
import DashboardHome from './pages/trainer/DashboardHome'
// import ChangePassword from './pages/trainer/ChangePassowrd'
const Login= lazy(()=>import('./pages/public/Login'))
const Register=lazy(()=>import('./pages/public/Register'))
const TrainerDashboard=lazy(()=>import('./pages/trainer/TrainerDashboard'))
const UserDashboard=lazy(()=>import('./pages/user/UserDashboard'))
const App = () => {
  return (
    <>

      <BrowserRouter>
        <Suspense fallback={<div>....Loading</div>}>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            {/* admin route */}
            <Route path='/adminDashboard' ></Route>
            {/* trainer route */}
            <Route path='/trainerdashboard' element={<TrainerDashboard/>}>
              <Route index element={<DashboardHome/>}></Route>
              <Route path='profile' element={<Profile/>}></Route>
              <Route path='addskills' element={<AddSkills/>}></Route>
              <Route path='content' element={<Content/>}></Route>
              <Route path='handshake' element={<Handshake/>}></Route>
              <Route path='changepassword' element={<TrainerChangePassword/>}></Route>
              {/* <Route path='changepassword' element={<ChangePassword/>}></Route> */}
            </Route>
            {/* user route */}
            <Route path='/userdashboard' element={<UserDashboard/>}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

    </>
  )
}

export default App