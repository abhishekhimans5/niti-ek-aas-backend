import jwt from 'jsonwebtoken'

const authMiddleWare = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    let token = null;
    if(authHeader){
        token = authHeader.split(' ')[1];
    }
    if(!token){
        return res.error("No token passed",401,'Access denied. Please provide a valid token');
    }
    else{

        try {
            const isVerified = jwt.verify(token,process.env.JWT_SECRET);
            if(isVerified){
                req.userId = isVerified.id;
                req.userEmail = isVerified.email;
               next();
            }else{
                return res.error("Invalid token or Expired token passed",404,'Invalid Token')
            }
        } catch (error) {
            return res.error('Server error',400,"Something wrong happened while authenticating")
        }
    }
}

export default authMiddleWare;