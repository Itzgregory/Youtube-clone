import model from '../../models';
import userDao from './user/user';
import videoDao from './videos/videos'
import subscriptionDao from './subscription/subscription';
import commentsDao from './comments/comments';
export = {
    userDao: userDao(model),
    videoDao: videoDao(model),
    subscriptionDao: subscriptionDao(model),
    commentsDao: commentsDao(model)
}




