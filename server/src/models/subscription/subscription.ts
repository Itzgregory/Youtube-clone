import { Schema, model } from 'mongoose'


const subscriberSchema = new Schema({
    userTo:{type: Schema.Types.ObjectId, ref:'User'},
    videoTo:{type: Schema.Types.ObjectId, ref:'Video'},
},
{
    timestamps: true
})

module.exports = model('subscription', subscriberSchema, 'subscription')
