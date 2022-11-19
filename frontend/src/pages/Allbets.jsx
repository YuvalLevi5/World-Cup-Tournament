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
      const worldCupUsers = await worldCupService.getUsers()
      if (games.length === 0) return
      for (var i = 0; i < worldCupUsers.length; i++) {
        let addToScore = 0
        for (var j = 0; j < games.length; j++) {
          if (games[j].winner) {
            if (worldCupUsers[i].results.length > 0) {
              if (worldCupUsers[i]?.results[j]?.isChecked === false) {
                worldCupUsers[i].results[j].isChecked = true
                if (games[j]?.winner === worldCupUsers[i]?.results[j]?.winner) {
                  addToScore += 2
                  if (games[i]?.teamOneGoals === worldCupUsers[i]?.results[j]?.teamOneGoals && games[i]?.teamTwoGoals === worldCupUsers[i]?.results[j]?.teamTwoGoals) {
                    addToScore += 1
                  }
                }
              }
            }
          }
        }
        worldCupUsers[i].score += addToScore
        await worldCupService.updateUser(worldCupUsers[i])
      }
      const updatedWorldCupUsers = await worldCupService.getUsers()
      setUsers(updatedWorldCupUsers)
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
                        <td className='user-name-td' >{user.username}</td>
                        <td>{user.score}</td>
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
  // return (
  //   <>
  //     <AppHeader />
  //     <div className='all-bets-page'>

  //       <div className='table-container'>
  //         <table className='users-table'>
  //           <thead>
  //             <tr>
  //               <th>Users</th>
  //               <th>Score</th>
  //               {
  //                 games && (
  //                   games.map((game) => {
  //                     return (
  //                       <th key={game.name}>
  //                         {game.name} <br />
  //                         {game.teamOneGoals}:{game.teamTwoGoals}
  //                       </th>
  //                     )
  //                   })
  //                 )
  //               }
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {
  //               users && (
  //                 users.map((user) => {
  //                   return (
  //                     <tr key={user._id}>
  //                       <td className='user-name-td' >{user.username}</td>
  //                       <td>{user.score}</td>
  //                       {
  //                         user.results && (
  //                           user.results.map((result, index) => {
  //                             if (games[index]?.date !== currentDate || (games[index]?.date === currentDate && games[index]?.hour <= currentHour) || games[index].winner) {
  //                               return (
  //                                 <td key={uuidv4()} className={getClass(result?.teamOneGoals, result?.teamTwoGoals, result?.winner, games[index]?.teamOneGoals, games[index]?.teamTwoGoals, games[index]?.winner)}>
  //                                   {result?.teamOneGoals}:{result?.teamTwoGoals}
  //                                 </td>
  //                               )
  //                             }
  //                           })
  //                         )
  //                       }
  //                     </tr>
  //                   )
  //                 })
  //               )
  //             }
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </>
  // )
}

export default Allbets