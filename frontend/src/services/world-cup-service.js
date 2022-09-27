import { httpService } from "./http.service"


export const worldCupService = {

}


async function login(username, password) {
    try {
        const data = await httpService.post(username, password)
        return data
    } catch (err) {
        console.log(err)
    }
}