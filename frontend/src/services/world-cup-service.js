import { httpService } from "./http.service"


export const worldCupService = {
    login,
    register,
    updateUser,
    getGames,
    getUsers,
    getCurrUser
}


async function login(username, password) {
    try {
        const data = await httpService.post('auth/login', {username, password})
        return data
    } catch (err) {
        console.log(err)
    }
}

async function register(username, password) {
    try {
        const data = await httpService.post('auth/register', {username, password})
        return data
    } catch (err) {
        console.log(err)
    }
}

async function updateUser(user) {
    try {
        const data = await httpService.put(`auth/${user._id}`, user)
        return data
    } catch (err) {
        console.log(err)
    }
}

async function getGames()  {
    const data = await httpService.get('games')
    return data
}

async function getUsers() {
    const data = await httpService.get('auth')
    return data
}

async function getCurrUser(username) {
    const data = await httpService.get(`auth/${username}`)
    return data
}