import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'

const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async () => {
        sessionStorage.clear()
        navigate('/login')
    }
    return (
        <div title='Logout' onClick={handleClick} className='logout-section'>
            <BiLogOut />
        </div>
    )
}

export default Logout