const jwt = require("jsonwebtoken");


module.exports = {
    authentication: (req, res, next) => {
        jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, err => {
            if (err) {
                return res.status(401).json({verified: false, message: "Unauthorized!"});
            } else {
                next()
            }
        })
    }
}