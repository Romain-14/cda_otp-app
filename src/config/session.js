export default {
	secret: process.env.ES_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: true,
        httpOnly: true,
		sameSite: "strict",
		maxAge: 1200000, // 20 minutes
	},
};
