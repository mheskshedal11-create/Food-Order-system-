import jwt from 'jsonwebtoken'
import User from '../models/auth.model.js'

export const userAuthorization = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authorized"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user
        req.user.role = decoded.role
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

export const authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource"
            })
        }
        next()
    }
}
