
import { Schema, model } from 'mongoose'
import { Video } from '../../interface'

const videoSchema = new Schema<Video>({
  videoPath: { type: String, required: true },
  thumbnailPath: { type: String },
  previewPath: {type: String},
  title: { type: String },
  description: { type: String },
  extension: { type: String, enum: ["mp4", "mov"] },
  user: { type: Schema.Types.ObjectId, ref:'User' }, 
  videoId: { type: String },
  views: {type: Number, default: 0},
  videoLength: {type: String },
  published: {type: Boolean, default: false},
  datePublished:{type: String, default: ''},
  likeId: {type: [], default: []},
},
{
  timestamps: true,
  versionKey: false
});

module.exports = model<Video>('Video', videoSchema);


