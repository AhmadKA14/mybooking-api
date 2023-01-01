import express from "express"
import { updateUser, deleteUser, getUser, getAllUsers } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkauth", verifyToken, (req, res, next) => {
//     res.send("User authenticated")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("User logged in")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Admin logged in")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser)

// DELETE
router.delete("/:id", verifyUser, deleteUser)

// GET
router.get("/:id", verifyUser, getUser)

// GET ALL
router.get("/", verifyAdmin, getAllUsers)


export default router