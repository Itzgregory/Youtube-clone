import busboy from 'busboy'
import fs from 'fs'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { getElementsVideo, logger, nanoid } from '../../Utils'

import { commentsService, subscriberService, videoService } from '../../interface'
const MIME_TYPES_VIDEO = ['video/mp4', 'video/mov', 'video/3pg', 'video/mkv', 'video/flv']
const MIME_TYPES_THUMBNAIL = ['image/jpg', 'image/jpeg', 'image/tiff', 'image/bmp']
const CHUNK_SIZE_IN_BYTES = 1000000
let values = new Map()

declare global {
    namespace Express {
        interface User {
            _id: string
        }
    }
}

const videoControllers = (videoService: videoService, subscriptionService: subscriberService, commentsService: commentsService) => {
    return {
        uploadVideo: async (req?: Request, res?: Response) => {
            const bb = busboy({ headers: req!.headers })
            const videoId = nanoid()
            let videoExtension: string
            let videoPath: string
            


            bb.on('file', (_, file, info) => {
                if (!MIME_TYPES_VIDEO.includes(info.mimeType)) {
                    return res!.status(StatusCodes.BAD_REQUEST).send('Invalid file type')
                }
                videoExtension = info.mimeType.split('/')[1]
                videoPath = process.cwd() + `/storage/videos/${videoId}.${videoExtension}`
                const stream = fs.createWriteStream(videoPath)
                file.pipe(stream)
                req!.on('aborted', async () => {
                    stream.end()
                    fs.unlink(`storage/videos/${videoId}.${videoExtension}`, err => err ? logger.error(err) : '')
                })
            })

            bb.on('finish', async () => {
                const { getThumbnail, getPreview } = await getElementsVideo(`${videoId}.${videoExtension}`)
                const defectThumbnail = getThumbnail()
                const defectPreview = getPreview()
                const video = await videoService.createVideoService(videoPath, req?.user?._id, videoExtension,videoId, defectThumbnail, defectPreview)
                res?.writeHead(StatusCodes.CREATED, {
                    Connection: 'close',
                    "Content-Type": "application/json"
                })
                res?.write(JSON.stringify(video))
                res?.end()
            })
            bb.on('error', () => {
                res?.send('error')
            })
            return req!.pipe(bb)
        },

        createElementsOfVideo: async (req: Request, res: Response, next: NextFunction) => {
            const bb = busboy({ headers: req!.headers })
            const thumbnailId = nanoid()
            let thumbnailExtension: string
            let thumbnailPath: string
            const { videoId } = req.params
            const video = await videoService.findVideoByIdService(videoId)

            bb.on('file', (_, file, info) => {
                if (!MIME_TYPES_THUMBNAIL.includes(info.mimeType)) {
                    return res!.status(StatusCodes.BAD_REQUEST).send('Invalid file type')
                }
                thumbnailExtension = info.mimeType.split('/')[1]
                thumbnailPath = `${thumbnailId}.${thumbnailExtension}`
                const stream = fs.createWriteStream(process.cwd() + `/storage/thumbnails/${thumbnailId}.${thumbnailExtension}`)
                fs.unlinkSync(process.cwd() + `/storage/thumbnails/${video.thumbnailPath}`)
                file.pipe(stream)
            })

            bb.on("field", (key, value) => {
                values.set(key, value)

            })

            bb.on('finish', async () => {
                const { getVideoLength } = await getElementsVideo(`${video.videoId}.${video.extension}`)

                let data = {
                    title: values.get('title'),
                    description: values.get('description'),
                    published: values.get('published')
                }
                const videoLength = getVideoLength()
                const videoUpdate = await videoService.updateVideoByIdService(videoId, data.title, data.description, data.published, thumbnailPath, videoLength)

                if (!videoUpdate) {
                    return res.status(StatusCodes.NOT_FOUND).send('Video not found')
                }
                res.send(videoUpdate)
                res.end()
            })

            bb.on('error', () => {
                res.status(StatusCodes.BAD_REQUEST).send('an error ocurrend while processing the video')
            })
            return req!.pipe(bb)
        },

        findvideos: async (req: Request, res: Response) => {
            const videos = await videoService.findVideosService()
            return res.status(StatusCodes.OK).send(videos)
        },

        getElementOfVideo: async (req: Request, res: Response) => {
            const { videoId } = req.params
            const video = await videoService.findVideoByIdService(videoId)
            return res.status(StatusCodes.OK).send(video)
        },

        streamVideo: async (req: Request, res: Response) => {
            const { videoId } = req.params
            const range = req.headers.range
            
            if (!range) {
                return res.status(StatusCodes.BAD_REQUEST).send("range must be provided")
            }

            const video = await videoService.findVideoByIdService(videoId)
            if (!video) {
                return res.status(StatusCodes.NOT_FOUND).send("video not found")
            }

            const videoPath = `${process.cwd()}/storage/videos/${video.videoId}.${video.extension}`

            const fileSizeInBytes = fs.statSync(videoPath).size

            const chunkStart = Number(range.replace(/\D/g, ''))
            const chunkEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, fileSizeInBytes - 1)

            const contentLength = chunkEnd - chunkStart + 1

            const headers = {
                "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${fileSizeInBytes}`,
                "Accept-Ranges": 'bytes',
                "Content-length": contentLength,
                "Content-Type": `video/${video.extension}`,
                "Cross-Origin-Resource-Policy": 'cross-origin'
            }

            res.writeHead(StatusCodes.PARTIAL_CONTENT, headers)

            const videoStream = fs.createReadStream(videoPath, {
                start: chunkStart,
                end: chunkEnd
            })

            videoStream.pipe(res)
        },
        addComentVideo: async (req: Request, res: Response) => {
            const { videoId } = req.params
            const videoCommented = await videoService.addComentVideo(videoId, req.body)
            if (!videoCommented) {
                res.status(StatusCodes.BAD_REQUEST).send('an error occurred while saving the comment')
            }
            res.status(StatusCodes.OK).send(videoCommented)
        },
        updateViewVideo: async(req: Request, res: Response) => {
            const { videoId } = req.params
            await videoService.updateViewVideo(videoId)
            res.status(StatusCodes.OK).send('update')
        },
        findVideosByUser: async(req: Request, res: Response) => {            
            const videos = await videoService.findVideosByUser(req.body)   
                              
            if(!videos){
                return res.status(StatusCodes.BAD_REQUEST).send('no videos')
            }     
            return res.status(StatusCodes.OK).send(videos)
        },
        deleteVideoById: async(req: Request, res: Response) =>{
            const videoDelete = await videoService.deleteVideoById(req.body)
            await subscriptionService.deleteSubscriptions(req.body)
            await commentsService.deleteComments(req.body)
            if(videoDelete){
                fs.unlinkSync(process.cwd() + `/storage/thumbnails/${videoDelete.thumbnailPath}`)
                fs.unlinkSync(process.cwd() + `/storage/previews/${videoDelete.previewPath}`)
                fs.unlinkSync(process.cwd() + `/storage/videos/${videoDelete.videoId}.${videoDelete.extension}`)
            }
            return res.status(StatusCodes.OK).send(videoDelete)
        },
        updateLikeVideo: async(req: Request, res: Response) => {    
            
            const {videoId} = req.params
            const videoLike = await videoService.updateLikeVideo(videoId, req.body)
            return res.status(StatusCodes.OK).send(videoLike)
        },
        updatePublished: async(req: Request, res: Response) => {            
            const updatePublished = await videoService.updatePublishedVideo(req.body)
            return res.status(StatusCodes.OK).send(updatePublished)
        }

    }
}

export = videoControllers