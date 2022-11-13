import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { worldCupService } from '../services/world-cup-service'
import AdminGame from '../components/AdminGame'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState(undefined)
    const [games, setGames] = useState([])

    const toastOptions = {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }

    useEffect(() => {
        async function check() {
            if (!localStorage.getItem('worldcup-app-user')) {
                navigate("/login");
            } else {
                var currUser = await JSON.parse(localStorage.getItem('worldcup-app-user'))

                if (!currUser?.isAdmin) {
                    navigate("/");
                    return
                }
                setCurrentUser(await JSON.parse(localStorage.getItem('worldcup-app-user')))
            }
        }
        check()
    }, [])

    useEffect(() => {
        async function getGames() {
            const worldCupGames = await worldCupService.getGames()
            setGames(worldCupGames)
        }
        getGames()
    }, [])

    const handleScore = async (score) => {
        const data = await worldCupService.updateGame(score)
        console.log(data)
        if (data.status === false) {
            toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
            console.log('gi')
            toast.success(`Your result is set to ${data.updateGame.teamOneGoals}:${data.updateGame.teamTwoGoals}, and the winner is ${data.updateGame.winner}`)
        }
    }

    return (
        <>
            <AppHeader />
            <div className='my-bets-zone'>
                <h1>AdminPage!</h1>

                {
                    games && (
                        games.map((game, index) => {
                            return (
                                <div key={index}>
                                    {!game.winner && (
                                        <AdminGame game={JSON.parse(JSON.stringify(game))} index={index} handleScore={handleScore} />
                                    )}
                                </div>
                            )
                        })
                    )

                }
            </div>

            <ToastContainer />
        </>
    )
}

export default Admin