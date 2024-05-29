//login, register, change password, delete account

const accountController = {
    handleLogin: (req, res, next) => {
        res.send("hello");
        next();
    },

    handleRegister: (req, res, next) => {
        const body = req.body;
        res.send("hi");
        next();
    }
}

export default accountController