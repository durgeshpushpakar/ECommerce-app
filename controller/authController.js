import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

// register controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        // validations
        if (!name) {
            return res.status(400).send({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({ message: 'email is required' });
        }
        if (!password) {
            return res.status(400).send({ message: 'password is required' });
        }
        if (!phone) {
            return res.status(400).send({ message: 'phone no is required' });
        }
        if (!address) {
            return res.status(400).send({ message: 'address is required' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'answer is required' });
        }

        //existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered please login'
            })
        }
        // register User
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, password: hashedPassword, phone, address, answer }).save();

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        console.log(`error in register controller: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        })
    }
};

// login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password);
        console.log(`value of match variable: ${match}`);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(`error in login controller: ${error}`);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "New password is required" })
        }
        const existingUser = await userModel.findOne({ email, answer });
        if (!existingUser) {
            res.status(404).send({
                success: false,
                message: "Incorrect email or answer"
            });
        }
        if (answer === existingUser.answer) {
            const newHashedPassword = await hashPassword(newPassword);
            const updatedUser = await userModel.findByIdAndUpdate(existingUser._id, { password: newHashedPassword });
            res.status(200).send({
                success: true,
                message: 'password changed successfully'
            })
        }
        else {
            res.status(404).send({ message: "Incorrect email or answer" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}


// test controller
export const testController = async (req, res, next) => {
    res.send(`Hello from test controller, I am a protected route!`);
}