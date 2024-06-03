import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

import { handleResponseError, handleResponseSuccess } from "../utils/response.js"

const generateAccessToken = (user) => {
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1d"})
}
const register = async( req, res ) => {
    const { email, password } = req.body
    console.log({email, password})
    if(!email || !password) {
        handleResponseError(res, 400, "Invalid email or password")
        return false;
    }

    const existedEmail = await User.findOne({email})
    if(existedEmail) {
        handleResponseError(res, 400, "Email is already existed")
        return false;
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound)
    try {
        const data = User.create({email, password: hashedPassword})
        console.log(data);
        handleResponseSuccess(res, 201, "Register successfully", { email: data.email, role: data.role})
    } catch (error) {
        console.log(error)
        throw new Error("")
    }
}

const login = async( req, res ) => {
    const { email, password } = req.body
    
    if(!email || !password) {
        handleResponseError(res, 400, "Invalid email or password")
        return false;
    }

    const existedEmailUser = await User.findOne({email})
    if(!existedEmailUser) {
        handleResponseError(res, 400, "Email is incorrect")
        return false;
    }

    const checkPasswordUser = await bcrypt.compare(password,existedEmailUser.password)

    if(!checkPasswordUser) {
        handleResponseError(res, 400, "Password is incorrect")
        return false;
    }

    const accessToken = generateAccessToken(checkPasswordUser)
    handleResponseSuccess(res, 200, "Login successfully", { email: existedEmailUser.email, role: existedEmailUser.role, accessToken })

}

const logout = ( req, res ) => {
    handleResponseSuccess(res, 200, "Logout successfully", {})
}

export { register, login, logout }