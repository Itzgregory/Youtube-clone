import { profileUserGmail, User, userInterfaceDao } from "../../interface"
const {CALLBACK_GOOGLE, CLIENT_ID_GOOGLE, CLIENT_SECRET_GOOGLE} = require( '../../../config')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const gmailPassport = (userDao:userInterfaceDao) => {  
    passport.use(
        new GoogleStrategy({
            callbackURL: CALLBACK_GOOGLE,
            "clientID": CLIENT_ID_GOOGLE,
            "clientSecret": CLIENT_SECRET_GOOGLE
        }, async (accessToken: any, refreshToken: any, profile: profileUserGmail, done: Function) => {
           await userDao.findOrCreateUser(profile, done)
        })
    )

    // Serialize user into the sessions
    passport.serializeUser((user: User, done: Function) => done(null, user));

    // Deserialize user from the sessions
    passport.deserializeUser((user: User, done: Function) => done(null, user));

}
export = gmailPassport

