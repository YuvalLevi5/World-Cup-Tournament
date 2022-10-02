import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
const AppHeader = () => {

const [score, setScore] = useState(0)

    const toggleMenu = () => {
        document.body.classList.toggle('menu-open')
    }
    
    return (
        <>
            <div onClick={toggleMenu} className="screen"></div>

            <header className="main-header">
                <div className="main-header-option main-layout">
                    <div className="logo header-logo">World Cup</div>
                    <ul className="main-nav">
                        <li><NavLink to='/'>All Bets</NavLink></li>
                        <li><NavLink to='/mybets'>Bets</NavLink></li>
                        <li><NavLink to='/personal'>My Bets History</NavLink></li>
                    </ul>
                    <button onClick={toggleMenu} className="btn menu-toggle-btn">☰</button>
                </div>
            </header >
        </>
    )
}

export default AppHeader