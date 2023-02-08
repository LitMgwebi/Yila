import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import e from "express";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        min: [6, "Please make a password with more than 6 characters"],
    },
},
    {
        statics: {
            //static signup method
            async signup(email, password) {

                //validation
                if (!email || !password) {
                    throw Error("Please fill in all required fields");
                }
                if (!validator.isEmail(email)) {
                    throw Error("Please enter a valid email");
                }
                if (!validator.isStrongPassword(password)) {
                    throw Error("Please enter strong password");
                }

                const exists = await this.findOne({ email })

                if (exists) {
                    throw Error("Email already exists, please signup with a different email")
                }

                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt);

                const user = await this.create({ email, password: hash })

                return user;
            },
            //static login method
            async login(email, password) {

                if (!email || !password) {
                    throw Error("Please fill in all required fields");
                }

                const user = await this.findOne({ email })

                if (!user) {
                    throw Error("Invalid email");
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    throw Error("Invalid password");
                }

                return user;

            }
        }
    }
);

const User = model('User', userSchema);

export default User;