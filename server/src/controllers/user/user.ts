import { Request, Response, NextFunction } from "express";
import passport from 'passport'
const userControllers = () => {
    return {
        createUser: (req: Request, res: Response, next: NextFunction) => {
           return passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
        },
        callbackUser: (req: Request, res: Response, next: NextFunction) => {
           return passport.authenticate('google', {
                successRedirect: "http://localhost:3000"
            })(req, res, next)            
        },
        logoutUser: (req: Request, res: Response, next: NextFunction) => {           
                req.logout(function(err) {
                    if (err) { return next(err); }
                   res.send('user logout')
                  })              
            
        },
        getLogedUser: (req: Request, res: Response) => {
            res.status(200).send(req.user)
        }
    }
}

export = userControllers