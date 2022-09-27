import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Allbets from './pages/Allbets';
import Login from './pages/Login';
import Personal from './pages/Personal';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/personal' element={<Personal />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Allbets />} />
      </Routes>
    </Router>
  )
}

export default App