declare namespace Express {
    interface Request {
        user: import('@modules/user/entity/user.entity').User;
    }
}