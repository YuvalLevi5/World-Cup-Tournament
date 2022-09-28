import { httpService } from "./http.service"


export const worldCupService = {
    login,
    register
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