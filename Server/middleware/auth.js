const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        console.log("token: " + token)
        if (!token) {
            throw Error("unauthorization");
        }

        let verified;
        try {
            verified = await jwt.verify(token, process.env.JWT_TOKEN);
        } catch (error) {
            throw Error("Unauthorization");
        }

        req.user = verified;
        req.token = token;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            content: error.message
        })
    }
}

exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({
                success: false,
                content: "Forbidden"
            });
        }
    };
};