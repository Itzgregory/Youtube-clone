import axios from 'axios'
import { User, video } from '../../interface'

const base = process.env.NEXT_PUBLIC_API_ENDPOINT

const subscriptionBase = `${base}/comments`


export const getComment = async (videoId:string) => {
    const res = await axios.post(`${subscriptionBase}/get/${videoId}`)
    return res.data
}
export const setComment = async ({postId,content, writer }: {
    postId: string
    content: string,
    writer: User,
}) => {    
    const res = await axios.post(`${subscriptionBase}/set/${postId}`,{content: content, writer: writer})
    return res.data
}
