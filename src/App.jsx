import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudentList from './Components/StudentList/StudentList';
import Login from './Components/Register/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Register/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
        <Route path='/' element={user ? <StudentList /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  );
};

export default App;
