import { createUser, loginUser } from "../services/userService.js"
import { generateToken } from "../utils/generateToken.js";

export const login = async(req,res) => {
    const user = {
        email : req.body.email,
        password : req.body.password,
    }
    let result = await loginUser(user);
    if(result.error){
        res.error(result.error.msg,result.error.statusCode);
    }else{
        const token = await generateToken(result.data);
        result.data = {...result.data,
            token : token
        }
        res.success('Login successfull',result.data);
    }
}

export const register = async(req,res) => {
    const user = req.body;
    console.log(user);
    const result = await createUser(user);

    if(result.error){
        res.error(result.error.msg,result.error.statusCode);
    }else{
        res.success('Registration successfull',result.data,201);
    }
}