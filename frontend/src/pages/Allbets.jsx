import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { worldCupService } from '../services/world-cup-service'
import { v4 as uuidv4 } from "uuid";

const Allbets = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [users, setUsers] = useState([])
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

  useEffect(() => {
    async function getUsers() {
      const worldCupUsers = await worldCupService.getUsers()
      setUsers(worldCupUsers)
    }

    getUsers()
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
            users && (
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    {
                      user.results && (
                        user.results.map((result, index) => {
                          return (
                            <td key={uuidv4()}>{result.teamOneGoals}:{result.teamTwoGoals}</td>
                          )
                        })
                      )
                    }
                  </tr>
                )
              })
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Allbets