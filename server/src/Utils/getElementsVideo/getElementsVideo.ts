import getVideoDurationInSeconds from 'get-video-duration'
import path from 'path'
import { nanoid } from '..'
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);

export const getElementsVideo = async (filename: string) => {
    const videoPath = path.join(__dirname, `../../../storage/videos/${filename}`)
    const thumbnailName = nanoid() + '.jpg'
    const thumbnailPath = path.join(__dirname, `../../../storage/thumbnails`)
    const previewName = nanoid() + '.gif'
    const previewPath = path.join(__dirname, `../../../storage/previews/${previewName}`)

    const randomGenerateTime = (secLen: number) => {
        return new Date(Math.floor(Math.random()* secLen) * 1000).toISOString().slice(11, 19);
    }
    const time = await getVideoDurationInSeconds(videoPath)
    return {
        getThumbnail: function () {
            ffmpeg(videoPath).screenshot({ count: 1, filename: thumbnailName, folder: thumbnailPath, timemarks: [randomGenerateTime(time)] })
            return thumbnailName
        },
    
        getPreview: function (){
           ffmpeg().input(videoPath).inputOptions([`-ss ${0}`]).outputOptions([`-t ${30}`]).noAudio().output(previewPath).run()
           return previewName
        },
        getVideoLength: function (){
             return new Date(time * 1000).toISOString().slice(11, 19);
         }
    }
}

