const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/Blacklist");
const { z } = require("zod");

const authSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const registerSchema = authSchema.extend({
    name: z.string().min(1, "Name is required"),
});

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

/**
 * @name registerUserController
 * @description Register a new user, expects name, email and password
 * @access Public
 */

async function registerUserController(req, res) {
    const validationResult = registerSchema.safeParse(req.body);
    if (!validationResult.success) {
        const errorMessage = validationResult.error?.issues?.[0]?.message || validationResult.error?.errors?.[0]?.message || "Invalid request data";
        return res.status(400).json({ message: errorMessage });
    }
    const { name, email, password } = validationResult.data;
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ name }, { email }]
    })

    if (isUserAlreadyExist) return res.status(400).json({ message: "Account with this name or email already exists." });

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        email,
        password: hash,
    });
    const token = jwt.sign({
        id: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
    })
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

    })

}

/**
 * @name loginUserController
 * @description Login a user, expects email and password
 * @access Public
 */

async function loginUserController(req, res) {
    console.log("BODY:", req.body);

    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
        const errorMessage = validationResult.error?.issues?.[0]?.message || validationResult.error?.errors?.[0]?.message || "Invalid request data";
        return res.status(400).json({ message: errorMessage });
    }
    const { email, password } = validationResult.data;

    const user = await userModel.findOne({ email });
    console.log("USER:", user);

    if (!user)
        return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("PASSWORD VALID:", isPasswordValid);

    if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}

/**
 * @name logoutUserController
 * @description Logout a user, token to be sent to blacklist
 * @access Public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
    });
    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description Get the details of the current logged in user
 * @access Private
 */

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User detail fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("getMe error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController };
