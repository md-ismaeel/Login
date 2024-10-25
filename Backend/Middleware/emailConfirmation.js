import { userModel } from "../Model/userModel.js";
import jwt from "jsonwebtoken"
import "dotenv/config"

const secretKey = process.env.SECRET_KEY;

export default async function confirmationEmail(req, res) {
    const { token } = req.params;
    // console.log("token", token);
    try {

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized user token is required!!"
            })
        }

        const decoded = jwt.verify(token, secretKey);

        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "unAuthorized user not found!!"
            })
        }

        if (user.confirm) {
            return res.status(400).json({
                success: false,
                message: "email is already confirmed!"
            });
        }

        user.confirm = true,
            await user.save()

        res.status(200).json({
            success: true,
            message: "your email is verified now you can login!!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}!!`
        })
    }

}