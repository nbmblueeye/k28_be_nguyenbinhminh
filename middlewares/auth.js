import jwt from 'jsonwebtoken';
import { handleResponseError } from '../utils/response.js';

export const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return handleResponseError(res, 401 ,'Invalid authorization')
    }

    const accessToken = authorization.split(" ")[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    if(!user){
        return handleResponseError(res, 401, 'Invalid user')
    }

    next()
}

export const authAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return handleResponseError(res, 401 ,'Invalid authorization')
    }
    const accessToken = authorization.split(" ")[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    if(!user || user.role !== 'admin'){
        return handleResponseError(res, 401, 'Fobiddebn user')
    }
    
    next()
}

