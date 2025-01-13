import { User, videoDao } from "../../interface"

const videoService = ( videoDao: videoDao ) => {
  
    return{
        createVideoService: async(videoPath: string, _id:string ,extension: string, videoId: string, defectThumbnail:string, defectPreview:string) => {
            return await videoDao.createVideo(videoPath, _id ,extension, videoId, defectThumbnail, defectPreview)
        },
        updateVideoByIdService: async(videoId: string, title: string, description:string, published:boolean, thumbnailPath: string, videoLength: string) => {
            return await videoDao.updateVideoById(videoId, title, description, published, thumbnailPath, videoLength)
        },
        findVideosService: async () => {
            return await videoDao.findVideos()
        },
        findVideoByIdService: async(videoId: string) => {
            return await videoDao.findVideoById(videoId)
        },
        addComentVideo: async(videoId: string, data:{user: User, comment: string}) => {
            return await videoDao.addComentVideo(videoId, data)
        },
        setVideoSubscriber: async(videoId: string, {_id}:{_id:string}) => {
            return await videoDao.setVideoSubscriber(videoId, _id)
        },
        getVideosSubscriber: async({userTo}:{userTo:string}) => {
            return await videoDao.getVideosSubscriber(userTo)
        },
        updateViewVideo: async(videoId: string) => {
            return await videoDao.updateViewVideo(videoId)
        },
        findVideosByUser: async({userId}: {userId:string}) => {
            return await videoDao.findVideosByUser(userId)
        },
        deleteVideoById: async({videoId}: {videoId: string}) =>{
            return await videoDao.deleteVideoById(videoId)
        },
        updateLikeVideo: async(videoId: string, {userId}: {userId:string}) => {
            return await videoDao.updateLikeVideo(videoId, userId)
        },
        updatePublishedVideo: async({videoId, published}: {videoId: string, published:boolean}) => {
            return await videoDao.updatePublishedVideo(videoId, published)
        },
    }
}

export =  videoService