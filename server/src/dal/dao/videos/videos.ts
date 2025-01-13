import { Models } from "mongoose"
import { User } from "../../../interface"

const videoDao = (model: Models) => {
    const { videoModel } = model
    return {
        createVideo: async (videoPath: string, _id: string, extension: string, videoId: string, defectThumbnail: string, defectPreview: string) => {
            const newVideo = new videoModel({
                videoPath: videoPath,
                user: _id,
                extension: extension,
                videoId: videoId,
                thumbnailPath: defectThumbnail,
                previewPath: defectPreview
            })
            return await newVideo.save()
        },

        updateVideoById: async (videoId: string, title: string, description: string, published: boolean, thumbnailPath: string, videoLength: string) => {
            const fecha = published.toString() === 'true' ? new Date(Date.now()).toISOString() : ''
            const video = await videoModel.updateOne({ videoId: videoId }, {
                title: title,
                description: description,
                published: published,
                videoLength: videoLength,
                datePublished: fecha,
                thumbnailPath: thumbnailPath
            })

            return video
        },
        findVideos: async () => {
            const videos = videoModel.find({ published: true })
                .populate('user')
                .exec();
            return videos
        },
        findVideoById: async (videoId: string) => {
            const video = videoModel.findOne({ videoId: videoId })
                .populate('user')
           
                .exec();
            return video

        },
        findVideosByUser: async (userId: string) => {

            const videos = await videoModel.find({ user: userId })
            .populate('user')
       
            return videos
        },
        updateViewVideo: async (videoId: string) => {
            return await videoModel.updateOne({ videoId: videoId }, {
                $inc:
                {
                    views: 1
                }
            })
        },

        deleteVideoById: async (videoId: string) => {
            return await videoModel.findOneAndDelete({ _id: videoId })
        },

        updateLikeVideo: async (videoId: string, userId: string) => {
            const videoLike = await videoModel.findOne({ videoId: videoId })

            if (videoLike.likeId.includes(userId)) {
                const index = videoLike.likeId.findIndex((element: string) => element === userId)
                videoLike.likeId.splice(index, 1)
                return videoLike.save()
            } else {
                videoLike.likeId.push(userId)
                return videoLike.save()
            }
        },
        updatePublishedVideo: async (videoId: string, published: boolean) => {
            return await videoModel.updateOne({ videoId: videoId }, {
                published: !published
            })
        },
    }
}

export = videoDao