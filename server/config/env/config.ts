import * as dotenv from 'dotenv'
dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_URL: process.env.MONGO_URL,
    CALLBACK_GOOGLE: process.env.CALLBACK_GOOGLE,
    CLIENT_ID_GOOGLE: process.env.CLIENT_ID_GOOGLE,
    CLIENT_SECRET_GOOGLE: process.env.CLIENT_SECRET_GOOGLE
}

