import { authenticator } from 'otplib';
import qrcode from 'qrcode';

import UserService from "../services/user.service.js";

const register = async (req, res) => {
	if (req.body.username.length < 3) {
		return res
			.status(400)
			.send("Username must be at least 3 characters long");
	}
	if (req.body.password.length < 8) {
		return res
			.status(400)
			.send("Password must be at least 8 characters long");
	}
	const user = await UserService.create(req.body);
	res.redirect("/login");
};

const login = async (req, res) => {
	try {
		const {username, hasOTP} = await UserService.login(req.body);
        console.log(username, hasOTP)
		req.session.user = {username, otp: hasOTP};
        req.session.otpVerified = false;
        console.log("login", req.session)
		res.redirect("/generate-otp");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const generateOTP = (req, res) => {
    const secret = authenticator.generateSecret();
    req.session.otpSecret = secret;
    console.log("generateOTP",req.session)
    const otpauth = authenticator.keyuri(req.session.user.username, 'Super Blog', secret);

    qrcode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
            return res.status(500).send('Error generating QR code');
        }
        res.render('template', { template: "pages/generate-otp", imageUrl });
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
