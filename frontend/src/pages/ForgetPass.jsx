import React from 'react'
import { useState } from 'react'
import { worldCupService } from '../services/world-cup-service'
import { NavLink } from "react-router-dom";
const ForgetPass = () => {
    const [currentStage, setCurrentStage] = useState(0)
    const [enteredUsername, setEnteredUsername] = useState(0)
    const [currentUser, setCurrentUser] = useState('')
    const [userAns, setUserAns] = useState('')
    const [userRealPassword, setUserRealPassword] = useState('')

    const handleChange = (event) => {
        const value = event.target.value
        setEnteredUsername(value)
    }

    const handleChangeAns = (event) => {
        const value = event.target.value
        setUserAns(value)
    }

    const checkUser = async () => {
        const user = await worldCupService.getCurrUserForResetPass(enteredUsername)
        if (user) {
            setCurrentStage(1)
            setCurrentUser(user)
        }
    }

    const checkAns = () => {
        if (userAns === currentUser.secretAns) {
            setUserRealPassword(currentUser.password)
            setCurrentStage(2)
        }
    }

    return (
        <>
            <section className='form-container'>

                {
                    currentStage === 0 && (
                        <div className='bla'>
                            <div className='login-form'>
                                <h3>Please Enter Your Username: </h3>
                                <input onChange={(e) => handleChange(e)} type="text" placeholder='username' />
                                <button onClick={checkUser}>Click</button>
                            </div>
                        </div>
                    )
                }

                {
                    currentStage === 1 && (
                        <div className='bla'>
                            <div className='login-form'>
                                <h3>Please enter your grandmother name</h3>
                                <input onChange={(e) => handleChangeAns(e)} type="text" placeholder='Grandmother Name' />
                                <button onClick={checkAns}>Click</button>
                            </div>
                        </div>
                    )
                }
                {
                    currentStage === 2 && (
                        <div className='bla'>
                            <div className='login-form'>
                                <h3>Your Password Is:</h3>
                                <h5>{userRealPassword}</h5>
                                <button className="btn register">
                                    <NavLink to="/login">Login</NavLink>
                                </button>
                            </div>
                        </div>
                    )
                }

            </section>
        </>
    )
}

export default ForgetPass