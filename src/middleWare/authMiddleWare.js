import jwt from 'jsonwebtoken'

const authMiddleWare = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    let token = null;
    if(authHeader){
        token = authHeader.split(' ')[1];
    }
    if(!token){
        // return res.status(200).json({
        //     "Error" : {
        //         error : "Access denied. Please provide a valid token",
        //         statusCode : 401,
        //         message : "No token passed"
        //     },
        //     "data" : {}
        // })
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
                // res.status(404).json({
                //     "Error" : {
                //         error : "Invalid Token",
                //         statusCode :  404,
                //         message : "Invalid token or Expired token passed"
                //     },
                //     "data" : {}
                // });
                return res.error("Invalid token or Expired token passed",404,'Invalid Token')
            }
        } catch (error) {
            // res.status(400).json({
            //    "Error" : {
            //         error : "Something wrong happened while authenticating",
            //         statusCode : 400,
            //         message : "Server error",
            //    },
            //    "data" : {}
            // })
            return res.error('Server error',400,"Something wrong happened while authenticating")
        }
    }
}

export default authMiddleWare;