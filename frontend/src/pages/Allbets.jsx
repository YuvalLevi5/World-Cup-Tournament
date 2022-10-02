import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { worldCupService } from '../services/world-cup-service'
import { v4 as uuidv4 } from "uuid";

const Allbets = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [users, setUsers] = useState([])
  const [currentHour, setScurrentHour] = useState(undefined)
  const [currentDate, setScurrentDate] = useState(undefined)

  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('worldcup-app-user')) {
        navigate("/login");
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

  useEffect(() => {
    let yourDate = new Date()
    setScurrentDate(yourDate.toISOString().split('T')[0])
    let currentHour = yourDate.getHours()
    setScurrentHour(yourDate.getHours())

    const interval = setInterval(() => {
      let yourDate = new Date()
      setScurrentDate(yourDate.toISOString().split('T')[0])
      let currentHour = yourDate.getHours()
      setScurrentHour(yourDate.getHours())
    }, 60000);

    return () => clearInterval(interval);

  }, [])

  useEffect(() => {
    async function setScore() {
      for (var i = 0; i < users.length; i++) {
        let addToScore = 0
        const scoreUser = JSON.parse(JSON.stringify(users[i]))
        for (var i = 0; i < games.length; i++) {
          if (games[i].winner) {
            if (scoreUser.results.length > 0) {
              if (scoreUser?.results[i].isChecked === false) {
                scoreUser.results[i].isChecked = true
                if (games[i].winner === scoreUser?.results[i].winner) {
                  addToScore += 2
                  if (games[i].teamOneGoals === scoreUser.results[i].teamOneGoals && games[i].teamTwoGoals === scoreUser.results[i].teamTwoGoals) {
                    addToScore += 1
                  }
                }
              }
            }
          }
        }
        scoreUser.score += addToScore
        await worldCupService.updateUser(scoreUser)
      }
    }

    setScore()
  }, [games, users])

  const getClass = (userScoreTeamOne, userScoreTeamTwo, userWinner, ftTeamOneGoals, ftTeamTwoGoals, ftTeamWinner) => {
    let status = ''
    if (!ftTeamWinner) {
      return 'pending'
    }
    if (userWinner === ftTeamWinner) {
      status = 'two'
    }
    if (userScoreTeamOne === ftTeamOneGoals && userScoreTeamTwo === ftTeamTwoGoals) {
      status = 'three'
    }
    if (!status) {
      status = 'red'
    }

    return status
  }

  return (
    <div className='all-bets-page'>

      <div className='table-container'>
        <table className='users-table'>
          <thead>
            <tr>
              <th>Users</th>
              <th>Score</th>
              {
                games && (
                  games.map((game) => {
                    return (
                      <th key={game.name}>
                        {game.name} <br />
                        {game.teamOneGoals}:{game.teamTwoGoals}
                      </th>
                    )
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
                      <td>{user.score}</td>
                      {
                        user.results && (
                          user.results.map((result, index) => {
                            if (games[index]?.date !== currentDate || (games[index]?.date === currentDate && games[index]?.hour < currentHour)) {
                              return (
                                <td key={uuidv4()} className={getClass(result?.teamOneGoals, result?.teamTwoGoals, result?.winner, games[index]?.teamOneGoals, games[index]?.teamTwoGoals, games[index]?.winner)}>
                                  {result?.teamOneGoals}:{result?.teamTwoGoals}
                                </td>
                              )
                            }
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
    </div>
  )
}

export default Allbets