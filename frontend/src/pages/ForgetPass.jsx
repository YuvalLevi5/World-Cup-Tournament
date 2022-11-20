import React from 'react'
import { useState } from 'react'
import { worldCupService } from '../services/world-cup-service'
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPass = () => {
    const [currentStage, setCurrentStage] = useState(0)
    const [enteredUsername, setEnteredUsername] = useState(0)
    const [currentUser, setCurrentUser] = useState('')
    const [userAns, setUserAns] = useState('')
    const [userRealPassword, setUserRealPassword] = useState('')

    const toastOptions = {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }

    const handleChange = (event) => {
        const value = event.target.value
        setEnteredUsername(value)
    }

    const handleChangeAns = (event) => {
        const value = event.target.value
        setUserAns(value)
    }

    const checkUser = async () => {
        const data = await worldCupService.getCurrUserForResetPass(enteredUsername)
        if (data.status === false) {
            toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
            setCurrentStage(1)
            setCurrentUser(data.user)

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
                                <button onClick={()=> checkUser()}>Click</button>
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

            <ToastContainer />
        </>
    )
}

export default ForgetPass