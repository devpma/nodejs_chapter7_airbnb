const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const cloudinary = require('cloudinary').v2;

exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!email || !password || !name) {
            return res.status(400).json({
                message : "name, email and password are required"
            })
        }
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message : "User already exist"
            })
        }
        
        user = await User.create({
            name, email, password
        })

        cookieToken(user, res)

    } catch (error) {
        res.status(500).json({
            message: `internet server error`,
            error: error
        })

    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            })
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                message:"user not found"
            })
        }
        const isPasswordCorrect = await user.isValidatedPassword(password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "invaild password"
            })
        } 

    } catch (error) {
        res.status(500).json({
            message: " internal server error",
            error: error
        })
    }
}

exports.updateUserDetails = async (req, res) => {
    try {
        const {name, password, email, picture} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        user.name = name;
        if (picture && !password) {
            user.picture = picture
        } else if (password && !picture) {
            user.password = password 
        } else if (picture && password) {
            user.password = password
        }

        await updatedUser = user.save();
        cookieToken(updatedUser, res)

    } catch(error) {
        res.status(500).json({
            message: 'internal server error',
            error: error
        })
    }
}


exports.logout = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: 'logged out'
    })
}

exports.uploadPicture = async (req, res) => {
    const {path} = req.file
    try {
        let result = await cloudinary.uploader.upload(path, {
            folder: 'Airbnb/Users'
        })
        res.status(200).json(result.secure_url)
    } catch(error) {
        res.status(500).json({
            message: 'internal server error',
            error: error
        })
    }
}