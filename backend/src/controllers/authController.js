import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

export const authController = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            
            if (!name || !email || !password) {
                return res.status(400).json({ error: "All fields are required" });
            }
            
            const userExists = await User.checkExists(email);
            if (userExists) {
                return res.status(409).json({ error: "User already exists" });
            }
            
            const user = await User.create(name, email, password);
            
            const token = jwt.sign(
                { userId: user.id, email },
                process.env.JWT_SECRET || 'fallback_secret',
                { expiresIn: '24h' }
            );
            
            res.status(201).json({
                message: "User created successfully",
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }
            
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || 'fallback_secret',
                { expiresIn: '24h' }
            );
            
            res.json({
                message: "Login successful",
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    }
};