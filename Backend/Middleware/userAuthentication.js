import jwt from "jsonwebtoken";
import { userModel } from "../Model/userModel.js";

const secretKey = process.env.SECRET_KEY;

export default async function authentication(req, res, next) {
    /*
     * Points to be validated in token
     * 1. Token should be present
     * 2. Secret key validation with jwt.verify (This is the same token that we have generated)
     * 3. Token expiry date should not be passed
     * 4. Validate the issued at date (Optional)
     * 5. Validate the user id if it is present in database
     */

    const token = req.cookies.token;
    // console.log(token);

    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized user token is required!!",
            });
        }
        let tokenData = jwt.verify(token, secretKey);
        // console.log(tokenData);

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > tokenData.exp) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized user token expired!!",
            });
        }

        const authorizedUser = await userModel.findById(tokenData.userId);
        if (!authorizedUser) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized user!!",
            });
        }
        req.user = authorizedUser;

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}!!`,
        });
    }
    next();
}
