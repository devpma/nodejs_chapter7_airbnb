const cookieToken = (user, res) => {
    const token = user.getJwt.Token();

    const options = {
        expires: new Date(
            Date.now() + Process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'none' // 크로스 오리진 요청 허락
    }

    user.password = undefined;
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = cookieToken;