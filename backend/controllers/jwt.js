const { jwtAccessSecret, jwtRefreshSecret } = require("../constants");
const RefreshTokenSch = require('../models/refreshToken')
const jwt = require("jsonwebtoken")

const decodeJwt = async (req, res) => {
  jwt.verify(req.body.access_token, jwtAccessSecret, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ data: false });
    }
    res.status(200).json({ data: info });
  });
};

const refreshToken = async (req,res) => {
    try {
        const findToken = await RefreshTokenSch.find({refresh_token: req.body.refresh_token})
        if(findToken.length <= 0) {
            return res.status(400).json({data: false})    
        }
        var user;
        jwt.verify(req.body.refresh_token,jwtRefreshSecret,(err,info) => {
            if(err){
                console.log(err)
                res.status(400).json({data: false})
            }
            user = {name: info?.name,email: info?.email, img: info?.img}
        })
        const access_token = jwt.sign(user,jwtAccessSecret,{expiresIn: '1h'})
        res.status(200).json({data: {access_token: access_token, user}})
    } catch (error) {
        console.log(err);
        return res.status(400).json({ data: false });
    }
}

module.exports = {
  decodeJwt,
  refreshToken
};
