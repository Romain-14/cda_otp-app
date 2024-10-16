import UserService from "../services/user.service.js";

const home_view = (req, res) => {
	res.render("template", { template: "pages/home" });
};

const login_view = (req, res) => {
	res.render("template", { template: "pages/login" });
};

const register_view = (req, res) => { 
    res.render("template", { template: "pages/register" });
};

const dashboard_view = async (req, res) => {
    try {
		const user = await UserService.dashboard(req.session.user);
        res.render("template", { template: "pages/dashboard", imageUrl: null });
	} catch (error) {
		res.status(400).send(error.message);
	}

};



export { home_view, login_view, register_view, dashboard_view };
