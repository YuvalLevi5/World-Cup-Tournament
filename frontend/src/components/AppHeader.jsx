import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'

const AppHeader = () => {
    const [seeHeader, setSeeHeader] = useState(true)
    const [currentUser, setCurrentUser] = useState(undefined)

    const toggleMenu = () => {
        document.body.classList.toggle('menu-open')
    }


    useEffect(() => {
        async function check() {
            if (!sessionStorage.getItem('worldcup-app-user')) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(sessionStorage.getItem('worldcup-app-user')))
            }
        }
        check()
    }, [])


    return (
        <>

            <div onClick={toggleMenu} className="screen"></div>
            {
                currentUser && (
                    <header className="main-header">
                        <div className="main-header-option main-layout">
                            <div className="logo header-logo">World Cup</div>
                            <ul className="main-nav">
                                <li><NavLink to='/' onClick={toggleMenu}>Scores</NavLink></li>
                                <li><NavLink to='/mybets' onClick={toggleMenu}>Bets</NavLink></li>
                                <li><NavLink to='/personal' onClick={toggleMenu}>My Bets History</NavLink></li>
                                {
                                    currentUser?.isAdmin && (
                                        <>
                                            <li><NavLink to='/admin-games' onClick={toggleMenu} className="admin-tab">Admin - Games</NavLink></li>
                                            <li><NavLink to='/admin-users' onClick={toggleMenu} className="admin-tab">Admin - Users</NavLink></li>
                                        </>
                                    )
                                }

                                <li> <Logout /> </li>
                            </ul>
                            <button onClick={toggleMenu} className="btn menu-toggle-btn">☰</button>
                        </div>
                    </header >
                )
            }
        </>

    )
}

export default AppHeader