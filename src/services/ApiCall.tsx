import axios from 'axios'

const Client = axios.create({
    baseURL: 'http://localhost:3000'
})

export async function SignInApi (email: any, password: any) {
    const loginData = {
        'email': email,
        'password': password
    }
    console.log(loginData)

    return Client.post('/auth/signin', 
        loginData
    ).then((response) => {
        console.log(response.data)
        return response.data
    })
}

export async function SignUpApi (email: any, password: any, phoneNumber: any, lastName: any, firstName: any) {
    const signUpData = {
        'email': email,
        'password': password,
        'phone_number': phoneNumber,
        'lastName': lastName,
        'firstName': firstName,
        'isPhoneNumberVerified': true
    }
    console.log(signUpData)

    return Client.post('/auth/signup',
        signUpData
    ).then((response) => {
        console.log(response.data)
        return response.data
    })
}