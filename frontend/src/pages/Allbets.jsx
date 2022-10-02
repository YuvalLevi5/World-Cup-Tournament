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
    <div>Allbets</div>
  )
}

export default Allbets