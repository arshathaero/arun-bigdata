


export const color = '#D63D83'

export const getUser = async() => {
    const token = await localStorage.getItem('token')
    const name = await localStorage.getItem('name')
    const email = await localStorage.getItem('email')

    let user = {
        token: token,
        name: name,
        email:email
    }
    return user
}