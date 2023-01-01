import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(StatusCodes.OK).json(updatedUser)
    } catch (error) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json("User deleted.")
    } catch (error) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(StatusCodes.OK).json(user)
    } catch (error) {
        next(err)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(StatusCodes.OK).json(users)
    } catch (error) {
        next(err)
    }
}