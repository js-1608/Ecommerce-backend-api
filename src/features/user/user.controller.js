import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import userRepository from "./user.repository.js";
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
dotenv.config()
export default class UserController {

    constructor() {
        this.userRepository = new userRepository();
    }

    async signUp(req, res) {
        const { name, email, password, typeOf } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new UserModel(name, email, hashedPassword, typeOf);

        await this.userRepository.signUp(user);
        // res.status(201).send(user);

        // Exclude password from the response
        const { password: _, ...safeUser } = user;
        res.status(201).json(safeUser);
    }
    async signIN(req, res) {
        // console.log(req.data);
        try {
            const { email, password } = req.body;
            // find user by email
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                res.status(404).send("User Not Found");

            } else {
                // compare password with hashed password
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    const token = jwt.sign(
                        { userId: user._id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );
                    // send token
                    res.status(200).send(token);
                }else{
                     res.status(400).send("Incorrect credentials");

                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}