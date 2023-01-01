import { StatusCodes } from 'http-status-codes'
import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(StatusCodes.CREATED).json(savedHotel)
    } catch (error) {
        next(err)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(StatusCodes.OK).json(updatedHotel)
    } catch (error) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json("Hotel deleted.")
    } catch (error) {
        next(err)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(StatusCodes.OK).json(hotel)
    } catch (error) {
        next(err)
    }
}

export const getAllHotels = async (req, res, next) => {
    const { min, max, ...other } = req.query
    try {
        const hotels = await Hotel.find({
            ...other,
            cheapestPrice: { $gte: min || 1, $lte: max || 99999 }
        }).limit(req.query.limit)
        res.status(StatusCodes.OK).json(hotels)
    } catch (error) {
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(StatusCodes.OK).json(list)
    } catch (error) {
        next(err)
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.status(StatusCodes.OK).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ])
    } catch (error) {
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(StatusCodes.OK).json(list)
    } catch (error) {
        next(error)
    }
}