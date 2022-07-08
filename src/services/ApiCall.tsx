import axios from 'axios'

const Client = axios.create({
    baseURL: 'https://thegoodseat-back-end.herokuapp.com'
})

export async function SignInApi (email: any, password: any) {
    const loginData = {
        "email": email,
        'password': password
    }
    console.log(loginData)
    return Client.post('/auth/signin', {
        loginData
    }).then(response => {
        return response.data.body
    })
}