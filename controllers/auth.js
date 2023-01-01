import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError, NotFoundError } from "../utils/errors/index.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    try {
        if (!validateEmail(req.body.email)) {
            throw new BadRequestError('please enter valid email')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save()
        res.status(StatusCodes.CREATED).send("User has been created")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            throw new BadRequestError('please provide pass and email')
        }

        const user = await User.findOne({ username: req.body.username })
        if (!user) { throw new NotFoundError('Invalid Credentials') }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            throw new NotFoundError('Invalid Credentials')
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(StatusCodes.OK).json({ details: { ...otherDetails }, isAdmin })
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {

}