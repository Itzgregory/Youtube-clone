import { Models } from "mongoose"
import { profileUserGmail, User } from "../../../interface"
import { logger } from "../../../Utils"

const userDao = (model:Models) => {   
    const { userModel } = model
    return {      
        findOrCreateUser: (profile: profileUserGmail, done:Function) => {    
            userModel.findOne({ idGoogle: profile.id }, async function (err:Error, user:User) {
                if(err){
                    logger.error(err)
                    return done(null, false)
                }
                if (user) {                    
                    return done(null, user)
                } else {                   
                    let newUser = new userModel();
                    newUser.idGoogle = profile.id
                    newUser.displayName = profile.displayName
                    newUser.name = profile.name.givenName
                    newUser.surname = profile.name.familyName          
                    newUser.email = profile.emails[0].value
                    newUser.photo = profile.photos[0].value                
                    newUser.save(function(err: Error) {
                        if (err) {
                            logger.error('error to save user:' + err)
                            throw err;
                        }
                        logger.info('user registered successfully')
                        return done(null, newUser)
                    })
                }
            }) 
        }
    }
}

export = userDao 