import { httpService } from "./http.service"


export const worldCupService = {
    login,
    register,
    updateUser
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