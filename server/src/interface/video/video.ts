import { Models } from "mongoose";

export interface Video {
    videoPath: string,
    thumbnailPath: string,
    title: string,
    description: string,
    extension: string,
    user: Models,
    videoId: string,
    likeId: Array<string>,
    views: number, 
    datePublished: string,
    videoLength: string,
    published: boolean,
    previewPath: string,
}

export interface videoDao {
    createVideo: Function,
    findVideoById: Function
    updateVideoById: Function,
    findVideos: Function,
    addComentVideo: Function,
    setVideoSubscriber: Function,
    getVideosSubscriber: Function,
    updateViewVideo: Function,
    findVideosByUser: Function,
    deleteVideoById: Function,
    updateLikeVideo: Function,
    updatePublishedVideo: Function
}

export interface videoService {
    createVideoService: Function,
    updateVideoByIdService: Function,
    findVideosService: Function,
    findVideoByIdService: Function,
    addComentVideo: Function,
    setVideoSubscriber: Function,
    getVideosSubscriber: Function,
    updateViewVideo: Function
    findVideosByUser: Function,
    deleteVideoById: Function,
    updateLikeVideo: Function,
    updatePublishedVideo: Function
}
