import { authenticator } from 'otplib';
import qrcode from 'qrcode';

import UserService from "../services/user.service.js";
import pool from '../config/db.js';

const register = async (req, res) => {
    const { username, password } = req.body;

	if (username.length < 3 || password.length < 8) {
		return res
			.status(400)
			.send("Credential length must be respected");
	}

	await UserService.create(req.body);

	res.redirect("/login");
};

const login = async (req, res) => {
	try {
		const {username, hasOTP} = await UserService.login(req.body);

		req.session.user = {username, hasOTP };
        req.session.otpVerified = false;
        
		res.redirect("/dashboard");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const generateOTP = (req, res) => {
    const secret = authenticator.generateSecret();
    req.session.otpSecret = secret;
    const otpauth = authenticator.keyuri(req.session.user.username, 'Super Blog', secret);

    qrcode.toDataURL(otpauth, async (err, imageUrl) => {
        if (err) {
            return res.status(500).send('Error generating QR code');
        }
        await pool.execute('UPDATE users SET hasOTP = 1, auth_secret = ? WHERE username = ?', [secret, req.session.user.username]);
        req.session.user.hasOTP = 1;
        res.render("template", { template: "pages/dashboard", imageUrl });
        // res.render('template', { template: "pages/generate-otp", imageUrl });
    });
};

const verifyOTP = (req, res) => {
    const { token } = req.body;
    const isValid = authenticator.check(token, req.session.otpSecret);

    if (isValid) {
        req.session.otpVerified = true;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid OTP');
    }
};

export { register, login, generateOTP, verifyOTP };
