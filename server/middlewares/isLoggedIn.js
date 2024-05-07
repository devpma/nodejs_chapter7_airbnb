const jwt = require('jsonwebtoken')
exports.isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization').replace('Bearer', '');

    if (!token) {
        return res.status(400).json({
            success:false,
            message: "login frist to do this",

        })
    } 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserActivation.findById(decoded.id);
        next();
    } catch(error) {
        return res.status(401).json({
            success:false,
            message: 'invalid token'
        })
    }
}