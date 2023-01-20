const jwt = require('jsonwebtoken')
const config = require('../../config')
module.exports = {
    verifyToken: async (req,res)=>{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = atob(token)
        try{
            const decode = jwt.verify(decodedToken, config.jwtKey, (error, decoded)=>{
                if(decoded){
                    res.status(200).json({isTokenValid:true,user:decoded});
                }else{
                    res.status(401).json({isTokenValid:false});
                }
            })
        }catch(err){
            console.log(err)
            res.status(500).json({err});
        }
    }
}