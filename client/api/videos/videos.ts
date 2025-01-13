import axios from 'axios'
import { User } from '../../interface'
const base = process.env.NEXT_PUBLIC_API_ENDPOINT

const videoBase = `${base}/video`


export const uploadVideo = async ({
    formData, config
}: {
    formData: FormData,
    config: { onUploadProgress: (ProgressEvent: any) => void }
}) => {

    const res = await axios.post(`${videoBase}/upload`, formData, {
        withCredentials: true,
        ...config,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res.data
}

export const updateVideo = async ({ videoId, ...payload }: {
    videoId: string,
    title: string,
    description: string,
    published: boolean,
    thumbnail: any
}) => {
    return axios.patch(`${videoBase}/${videoId}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const getVideos = async () => {
    const res = await axios.get(videoBase)
    return res.data
}

export const getVideoPropertys = async (videoId: string | string[] | undefined) => {
    const res = await axios.get(`${videoBase}/${videoId}`)
    return res.data
}

export const updateVideoViews = async (videoId: string | string[] | undefined) => {
    const res = await axios.patch(`${videoBase}/views/${videoId}`)
    return res.data
}

export const getVideosByuser = async (user: string) => {
    const res = await axios.post(`${videoBase}/myvideos/`, { userId: user })
    return res.data
}

export const deleteVideoById = async (videoId : string ) => {
    const res = await axios.delete(`${videoBase}/delete`, {data: { videoId: videoId }})   
    return res.data
}

export const updateLikeIdVideo = async ({videoId, user}: {
    videoId: string | string[] | undefined,
    user: User
}) => {  
    const res = await axios.patch(`${videoBase}/like/${videoId}`,{userId: user._id})
    return res.data
}

export const updatePublishedVideo = async ({videoId, published}: {videoId: string, published: boolean} ) => {
    const res = await axios.patch(`${videoBase}/published/update`, { videoId: videoId, published: published })   
    return res.data
}







