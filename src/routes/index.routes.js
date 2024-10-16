import { Router } from "express";
import { home_view, login_view, register_view, dashboard_view } from "../controllers/views.controller.js";

import { register, login, generateOTP, verifyOTP } from "../controllers/user.controller.js";

const router = Router();

router.get("/", home_view);
router.get("/register", register_view);
router.get("/login", login_view);
router.get("/dashboard", dashboard_view);

router.get('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);



router.post("/register", register);
router.post("/login", login);

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/");
});

export default router;
