import { userModel } from "../Model/userModel.js";
import "dotenv/config"
import jwt from "jsonwebtoken"
import bcrypt, { hash, genSalt } from "bcrypt"

const secretKey = process.env.SECRET_KEY;

export default async function resetPassword(req, res) {
    // console.log(req.params);
    const { token } = req.params;
    const { newPassword } = req.body

    try {

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized user token is required!!"
            })
        }

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password is required!!"
            })
        }

        const decoded = jwt.verify(token, secretKey)
        const user = await userModel.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "unAuthorized user not found!!"
            })
        }

        // generating new hashed password 
        const salt = await genSalt(10);
        const hashedPss = await hash(newPassword, salt);

        user.password = hashedPss
        await user.save()

        res.status(200).json({
            success: true,
            message: "password reset successfully you can login Now!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}!!`
        })
    }
}