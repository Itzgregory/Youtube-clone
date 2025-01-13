import { Schema, model } from 'mongoose'
import { User } from '../../interface'

const userSchema = new Schema<User>({
  idGoogle: { type: String },
  displayName: { type: String },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, default: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" },
  avatarId: { type: String },
 
});

module.exports = model<User>('User', userSchema, 'User');


