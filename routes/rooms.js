import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailabilitiy } from "../controllers/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

// CREAT
router.post("/:hotelId", verifyAdmin, createRoom)

// UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailabilitiy)

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)

// GET
router.get("/:id", getRoom)

// GET ALL
router.get("/", getAllRooms)

export default router