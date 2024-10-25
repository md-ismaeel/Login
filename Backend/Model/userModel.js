import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "userName is required!!"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required!!"],
        unique: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: "please provide a valid email",
        },
    },
    password: {
        type: String,
        required: [true, "password is required!!"],
        minLength: [8, "password minimum length should be 8 character!!"],
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: [true, "mobileNumber is required!!"],
        minLength: [10, "minimum length 10 required!!"],
        maxLength: [10, "minimum length 10 required!!"],
    },
    confirm: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null,
    },
});

export const userModel = mongoose.model("users", userSchema);
