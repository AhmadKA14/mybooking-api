import jwt from "jsonwebtoken"
import { UnauthenticatedError, CustomAPIError } from "./errors/index.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        throw new UnauthenticatedError("User not authenticated")
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) { throw new CustomAPIError("Token not valid", 403) }

        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else { throw new CustomAPIError("Not authorized", 403) }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else { throw new CustomAPIError("Not authorized", 403) }
    })
}