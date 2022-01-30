const jwt = require('jsonwebtoken')
const UserSch = require('../models/user')
const RefreshTokenSch = require('../models/refreshToken')
const { jwtAccessSecret, jwtRefreshSecret } = require('../constants')

const login = async (req, res) => {
    try {
        const {name,email,img,gid} = req.body
        if(!name || !email || !img || !gid) {
            return res.status(400).json({data: "missing parameters"})    
        }
        const user = {name, email, img}
        const access_token = jwt.sign(user,jwtAccessSecret,{expiresIn: '1h'})
        const refresh_token = jwt.sign(user,jwtRefreshSecret,{expiresIn: '24h'})
        //check if user already exist or not
        var findData = await UserSch.find({email: req.body.email})
        const tokenData = new RefreshTokenSch({refresh_token})
        await tokenData.save()
        if(findData.length > 0){
            return res.status(201).json({data: {access_token,refresh_token}})
        }
        const data = new UserSch({name,email,img,gid})
        await data.save()
        res.status(200).json({data: {access_token,refresh_token}})
    } catch (error) {
        console.log(error)
        return res.status(400).json({data: "error"})
    }
}

module.exports = {
    login
}