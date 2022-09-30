import React from 'react'
import { NavLink } from 'react-router-dom'
const AppHeader = () => {

    const toggleMenu = () => {
        document.body.classList.toggle('menu-open')
    }
    return (
        <>
            <div onClick={toggleMenu} className="screen"></div>

            <header className="main-header">
                <div className="main-header-option main-layout flex justify-between items-center">
                    <div className="logo header-logo">World Cup</div>
                    <ul className="main-nav clean-list flex">
                        <li><NavLink to='/mybets'>My Bets</NavLink></li>
                        <li><NavLink to='/'>All Bets</NavLink></li>
                    </ul>
                    <button onClick={toggleMenu} className="btn menu-toggle-btn">☰</button>
                </div>
            </header >
        </>
    )
}

export default AppHeader