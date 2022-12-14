import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { worldCupService } from '../services/world-cup-service'
import { v4 as uuidv4 } from "uuid";
import AppHeader from '../components/AppHeader';

const Allbets = () => {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [users, setUsers] = useState([])
  const [currentHour, setScurrentHour] = useState(undefined)
  const [currentDate, setScurrentDate] = useState(undefined)

  useEffect(() => {
    async function check() {
      if (!sessionStorage.getItem('worldcup-app-user')) {
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

  // useEffect(() => {
  //   async function getUsers() {
  //     const worldCupUsers = await worldCupService.getUsers()
  //     setUsers(worldCupUsers)
  //   }

  //   getUsers()
  // }, [])

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
      console.time()
      var counter = 0
      const worldCupUsers = await worldCupService.getUsers()
      if (games.length === 0) return
      for (var i = 0; i < worldCupUsers.length; i++) {
        let currUser = JSON.parse(JSON.stringify(worldCupUsers[i]))
        let addToScore = 0
        for (var j = 0; j < games.length; j++) {
          if (games[j].winner) {
            if (worldCupUsers[i].results.length > 0) {
              if (worldCupUsers[i]?.results[j]?.isChecked === false) {
                worldCupUsers[i].results[j].isChecked = true
                if (games[j]?.winner === worldCupUsers[i]?.results[j]?.winner) {
                  addToScore += 2
                  if (games[j]?.teamOneGoals === worldCupUsers[i]?.results[j]?.teamOneGoals && games[j]?.teamTwoGoals === worldCupUsers[i]?.results[j]?.teamTwoGoals) {
                    addToScore += 1
                  }
                }
              }
            }
          }
        }

        worldCupUsers[i].score += addToScore

        let shouldCheck = JSON.stringify(currUser) === JSON.stringify(worldCupUsers[i]) ? false : true

        if (shouldCheck) {
          counter++
          await worldCupService.updateUser(worldCupUsers[i])
        }

      }
      console.log(counter)
      const updatedWorldCupUsers = await worldCupService.getUsers()
      updatedWorldCupUsers.sort((a, b) => b.score - a.score)
      setUsers(updatedWorldCupUsers)
      console.timeEnd()
    }


    setScore()
  }, [games])

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

  function checkPos(idx) {
    switch (idx) {
      case 0:
        return 'pos-1'
      case 1:
        return 'pos-2'
      case 2:
        return 'pos-3'
      case 3:
        return 'pos-4'
      default:
        return ''
    }

  }

  return (
    <>
      <AppHeader />

      <div className='all-bets-page'>

        <div className='table-container'>
          <table className='users-table'>
            <thead>
              <tr>
                <th>Users</th>
                <th>Total Score</th>
                <th>Group Stage Score</th>
                <th>WC Winner Score</th>
                <th>Top Scorer Score</th>
                {
                  games && (
                    games.map((game) => {
                      return (
                        <th key={game.name}>
                          {game.name} <br />
                          {game.teamOneGoals}:{game.teamTwoGoals} <br />
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
                  users.map((user, idx) => {
                    return (
                      <tr key={user._id}>
                        <td className={'user-name-td ' + checkPos(idx)} >{user.username}</td>
                        <td className='bold-text' >{user.score}</td>
                        <td>{user?.gsc}</td>
                        <td>{user?.wcw}</td>
                        <td>{user?.ts}</td>
                        {
                          user.results && (
                            user.results.map((result, index) => {
                              if ((games[index]?.date === currentDate && games[index]?.hour <= currentHour) || games[index]?.winner) {
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

    </>
  )
}

export default Allbets