import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { worldCupService } from '../services/world-cup-service'

const Allbets = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('worldcup-app-user')) {
        navigate("/login");
      } else {
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

  return (
    <div className='table-container'>
      <table className='users-table'>
        <thead>
          <tr>
            <th>Users</th>
            {
              games && (
                games.map((game) => {
                  // if (game.winner) {
                    return <th key={game.name} >{game.name}</th>
                  // }
                })
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            
          }
        </tbody>
      </table>
    </div>
  )
}

export default Allbets