import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Allbets from './pages/Allbets';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBets from './pages/MyBets';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/mybets' element={<MyBets />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Allbets />} />
      </Routes>
    </Router>
  )
}

export default App