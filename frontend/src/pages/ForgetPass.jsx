import React from 'react'
import { useState } from 'react'
import { worldCupService } from '../services/world-cup-service'
const ForgetPass = () => {
    const [currentStage, setCurrentStage] = useState(0)
    const [enteredUsername, setEnteredUsername] = useState(0)
    const [currentUser, setCurrentUser] = useState('')
    const [userAns, setUserAns] = useState('')

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
            console.log('HI')
        }
    }

    return (
        <>
            {
                currentStage === 0 && (
                    <div>
                        <h3>Please Enter Your Username: </h3>
                        <input onChange={(e) => handleChange(e)} type="text" placeholder='username' />
                        <button onClick={checkUser}>Click</button>
                    </div>
                )
            }

            {
                currentStage === 1 && (
                    <div>
                        <h3>Please enter your grandmother name</h3>
                        <input onChange={(e) => handleChangeAns(e)} type="text" placeholder='Grandmother Name' />
                        <button onClick={checkAns}>Click</button>
                    </div>
                )
            }

        </>
    )
}

export default ForgetPass