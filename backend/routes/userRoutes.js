const express = require("express");
const router = express.Router();
const { registerUserController, loginUserController, logoutUserController, getMeController, updateProfileController } = require("../controllers/authController");
const { authUser } = require("../middleware/authMiddleware");

// POST /api/auth/register
router.post("/register", registerUserController);

// POST /api/auth/login
router.post("/login", loginUserController);

// POST /api/auth/logout
router.post("/logout", logoutUserController);

// GET /api/auth/me (protected)
router.get("/me", authUser, getMeController);

// PATCH /api/auth/profile/update (protected)
router.patch("/profile/update", authUser, updateProfileController);

module.exports = router;
