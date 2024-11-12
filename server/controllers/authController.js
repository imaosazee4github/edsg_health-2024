import { userModel } from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        let user = await userModel.findOne({ email });
    

        // If the user does not exist, create a new one
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new userModel({ email, password: hashedPassword });
            await user.save();
            console.log("New user created and saved to the database.");
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token for the logged-in user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

         // Set the token in a cookie
         res.cookie("auth_token", token, {
            httpOnly: true, // Ensures the cookie is only accessible via HTTP requests
            secure: process.env.NODE_ENV === "production", // Use 'secure' in production for HTTPS
            maxAge: 60 * 60 * 1000, // 1 hour expiration
        });

        // Respond with success message and token
        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error during login/signup process:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};



