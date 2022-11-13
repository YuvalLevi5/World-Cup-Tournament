import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Allbets from './pages/Allbets';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBets from './pages/MyBets';
import Personal from './pages/Personal';
import Admin from './pages/Admin';
import AdminUsers from './pages/AdminUsers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/admin-games' element={<Admin />} />
        <Route path='/admin-users' element={<AdminUsers />} />
        <Route path='/personal' element={<Personal />} />
        <Route path='/mybets' element={<MyBets />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Allbets />} />
      </Routes>
    </Router>
  )
}

export default App