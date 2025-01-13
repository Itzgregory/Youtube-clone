export interface User {
    _id: string,
    idGoogle: string,
    name: string;
    surname: string;
    email: string;
    photo?: string;
    avatarId?: string
    displayName: string,

}

export interface userInterfaceDao {
    findOrCreateUser: Function 
}

export interface Dao{
    userDao: userInterfaceDao
}

export interface profileUserGmail{
    displayName: string,
    emails: [{value: string, verified: boolean}]
    id: string,
    name:{familyName: string, givenName: string}
    photos:[{value:string}],
    provider: string
}

