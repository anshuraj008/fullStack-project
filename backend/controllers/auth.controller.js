import bcrypt from "bcrypt";
import User from "../models/User.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Admin Registration - Only allows ONE admin to be created
export const signupController = async (req,res,next) => {
    const { userName, email, password, role } = req.body;
    
    try {
        // Check if registering as admin
        if (role === 'admin') {
            // Check if any admin already exists
            const existingAdmin = await User.findOne({ role: 'admin' });
            
            if (existingAdmin) {
                return next(errorHandler(403, "Admin already exists. Only one admin account is allowed."));
            }
        }

        // Validate required fields
        if (!userName || !email || !password) {
            return next(errorHandler(400, "All fields are required"));
        }

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, "Email already registered"));
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        // Create new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            role: role || 'customer' // Default to customer if no role specified
        });

        await newUser.save();
        
        // Return success without password
        const { password: _, ...userWithoutPassword } = newUser._doc;
        
        res.status(201).json({ 
            success: true,
            message: role === 'admin' ? "Admin registered successfully" : "User registered successfully",
            user: userWithoutPassword
        });
    } catch(err) {
        next(err);
    }
}

// Admin/User Login
export const signinController = async (req,res,next) => {
    const {email, password, role} = req.body;
    
    try {
        // Validate required fields
        if (!email || !password) {
            return next(errorHandler(400, "Email and password are required"));
        }

        // Find user by email
        const validUser = await User.findOne({email: email});
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        // If role is specified, verify user has that role
        if (role && validUser.role !== role) {
            return next(errorHandler(403, `Access denied. This account is not registered as ${role}.`));
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid password"));
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: validUser._id, 
                role: validUser.role 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data without password
        const {password: _, ...userDetails} = validUser._doc;
        
        res.cookie("access_token", token, {
            httpOnly: true, 
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).status(200).json({
            success: true,
            message: "Login successful",
            user: userDetails,
            token
        });
    } catch (err) {
        next(err); 
    }
}

// Sign Out
export const signOutController = async (req, res,next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({
            success: true,
            message: "User signed out successfully"
        });
    } catch (err) {
        next(err)
    }
}

// Check if admin exists (for initial setup)
export const checkAdminExists = async (req, res, next) => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        res.status(200).json({
            success: true,
            adminExists: !!adminExists
        });
    } catch (err) {
        next(err);
    }
}
