const Dao = require('../dal/dao/index')
import gmailPassport from './passport/gmailPassport'
import { requireUser } from './user/requireUser'
const {userDao} = Dao
module.exports = {
    gmailPassport: gmailPassport(userDao),
    requireUser: requireUser

}

export { requireUser }
 