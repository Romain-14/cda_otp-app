export default {
	secret: process.env.ES_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
		sameSite: "strict",
		maxAge: 1200000, // 20 minutes
	},
};
