import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { StatusCodes } from 'http-status-codes'

export const createRoom = async (req, res, next) => {
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        await Hotel.findByIdAndUpdate(req.params.hotelId, {
            $push: { rooms: savedRoom._id }
        })

        res.status(StatusCodes.OK).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(StatusCodes.OK).json(updatedRoom)
    } catch (error) {
        next(err)
    }
}

export const updateRoomAvailabilitiy = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomsNumbers._id": req.params.id },
            {
                $push: {
                    "roomsNumbers.$.unavailableDates": req.body.dates
                }
            }
        )
        res.status(StatusCodes.OK).json("Room status has been updated")
    } catch (error) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(req.params.hotelId, {
                $pull: { rooms: req.params.id }
            })
        } catch (error) {
            next(error)
        }
        res.status(StatusCodes.OK).json("Room deleted.")
    } catch (error) {
        next(err)
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(StatusCodes.OK).json(room)
    } catch (error) {
        next(err)
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(StatusCodes.OK).json(rooms)
    } catch (error) {
        next(err)
    }
}