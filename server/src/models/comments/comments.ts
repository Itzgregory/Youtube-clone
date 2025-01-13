import { Schema, model } from 'mongoose'
import { Comment } from '../../interface'

const commentsSchema = new Schema<Comment>({
    content: {type: String},
    writer:{type: Schema.Types.ObjectId, ref:'User'},
    postId:{type: Schema.Types.ObjectId, ref:'Video'},
},
{
    timestamps: true
})

module.exports = model<Comment>('comments', commentsSchema, 'comments')


  
  