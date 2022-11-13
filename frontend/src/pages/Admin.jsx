import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { worldCupService } from '../services/world-cup-service'
import AdminGame from '../components/AdminGame'

const Admin = () => {
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState(undefined)
    const [games, setGames] = useState([])

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
        console.log(score)
        worldCupService.updateGame(score)
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


        </>
    )
}

export default Admin