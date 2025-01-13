import axios from 'axios'
import { User, video } from '../../interface'

const base = process.env.NEXT_PUBLIC_API_ENDPOINT

const subscriptionBase = `${base}/subscription`


export const getSubscription = async (userTo: {
    userTo: string,
}) => {
    const res = await axios.post(`${subscriptionBase}/get`, userTo)
    return res.data
}
export const setSubscription = async ({data, user}: {
    data: video | undefined,
    user: User
}) => {  
    const res = await axios.patch(`${subscriptionBase}/set`,{userTo: user._id, videoTo: data?._id})
    return res.data
}



