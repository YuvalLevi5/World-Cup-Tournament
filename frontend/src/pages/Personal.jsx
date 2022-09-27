import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Personal = () => {
  const navigate = useNavigate()

  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('worldcup-app-user')) {
        navigate("/login");
      }
    }
    check()
  }, [])

  return (
    <div>Personal</div>
  )
}

export default Personal