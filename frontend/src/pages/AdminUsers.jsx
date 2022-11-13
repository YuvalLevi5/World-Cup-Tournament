import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import UserScore from '../components/UserScore';
import { worldCupService } from '../services/world-cup-service';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminUsers = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined)
    const [users, setUsers] = useState([])
    const toastOptions = {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        async function check() {
            if (!sessionStorage.getItem('worldcup-app-user')) {
                navigate("/login");
            } else {
                var currUser = await JSON.parse(sessionStorage.getItem('worldcup-app-user'))

                if (!currUser?.isAdmin) {
                    navigate("/");
                    return
                }
                setCurrentUser(await JSON.parse(sessionStorage.getItem('worldcup-app-user')))
            }
        }
        check()
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    const updateScore = async (user) => {
        const data = await worldCupService.updateUser(user)
        console.log(data)
        if (data.status === false) {
            toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
            toast.success(`Score updated successfully`)
        }
        getUsers()
    }

    async function getUsers() {
        const worldCupUsers = await worldCupService.getUsers()
        setUsers(worldCupUsers)
    }

    return (
        <>
            <AppHeader />

            <div className='admin-users'>
                <h1 className='txt-center'>Admin Page - USERS</h1>
                {
                    users && (
                        users.map((user) => {
                            return <UserScore key={user._id} user={user} updateScore={updateScore} />
                        })
                    )
                }
            </div>

            <ToastContainer />
        </>
    )
}

export default AdminUsers