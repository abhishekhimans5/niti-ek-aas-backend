import User from "../model/User.js"
import { STATUS_CODE } from "../utils/constants.js";
import { emailNotification } from "../utils/emailNotification.js";
import { compare, encryptData } from "../utils/encryptData.js";
import { generateToken } from "../utils/generateToken.js";

export const createUser = async(user) => {
    try {
        const alreadyExist = await User.findOne({email : user.email});
        if(alreadyExist == null){
            const hashedPassword = await encryptData(user.password);
            if((hashedPassword?.hashed)){
                let newUser = {
                    ...user,
                    password : hashedPassword.hashed
                }
                newUser = new User(newUser);
                console.log(newUser)
                const createdUser = await newUser.save();
                const value = {
                    receiver : createdUser.email,
                    subject : 'Niti - Registration successfull',
                    username : createdUser.name,
                }
                // emailNotification(value);
                return {
                    error : null,
                    data : {
                        id : createdUser._id,
                        email : createdUser.email,
                        name : createdUser.username,
                        role : createdUser.role
                    }
                }
            }else{
                return {
                    error : {
                        msg : hashedPassword.error,
                        statusCode : STATUS_CODE.serverError,
                    },
                    data : null
                }
            }
            
        }else{
            return {
                error : {
                    msg : 'User already exist',
                    statusCode : STATUS_CODE.forbidded
                },
                data : null
            }
        }
    } catch (error) {
        console.log('i m error')
        return {
            error : {
                msg : error,
                statusCode : STATUS_CODE.serverError,
            },
            data : null
        }
    }
}



export const loginUser = async(user) => {
    try {
        if(user?.email?.length >= 12 && user?.password?.length > 8){
            
            const userForLogin = await User.findOne({email : user.email});
            if(userForLogin){
                const verifiedPassword = await compare(user.password,userForLogin.password);
                if(verifiedPassword.data && verifiedPassword.data != null){
                    const userObj = await getUserInfo(user.email);
                    const token = generateToken(userObj);
                    if(userObj.error){
                        return {
                            error : userObj.error,
                            data : null
                        }
                    }else{
                        return {
                            error : null,
                            data : userObj.data,
                            token : token
                        }
                    }
                    
                }else{
                    return {
                        error : {
                            msg : 'Incorrect Password',
                            statusCode : STATUS_CODE.unauthorized || 401
                        },
                        data : null
                    }
                }
            }else{
                return {
                    error : {
                        msg : 'User not exist',
                        statusCode : STATUS_CODE.notFound || 404
                    },
                    data : null
                }
            }

        }else{
            return {
                error : {
                    msg : 'Invalid credentials',
                    statusCode : STATUS_CODE.badRequest
                },
                data : null
            }
        }
    } catch (error) {
        return {
            error : {
                error,
                statusCode : STATUS_CODE.serverError
            },
            data : null
        }
    }

}


export const getUserInfo = async(email) => {
    try {
        const userInfo = await User.findOne({email : email});
        if(!userInfo || userInfo === null){
            return {
                error : {
                    msg : `User doesn't exist`,
                    statusCode : STATUS_CODE.notFound
                },
                data : null
            }
        }else{
            return {
                error : null,
                data : {
                    id : userInfo._id,
                    email : userInfo.email,
                    name : userInfo.username,
                    role : userInfo.role,
                    status : userInfo.status,
                    isVerified : userInfo.isVerified,
                    latLogin : userInfo.lastLogin,
                    createdAt : userInfo.createdAt,
                    companyUrl : userInfo.company_url,
                    fundingNeeded : userInfo.funding_needed,
                    businessType : userInfo.business_type,
                    availabilityType : userInfo.availability_type,
                    yearsOfExperience : userInfo.years_of_experience,
                    areaOfExpertise : userInfo.area_of_expertise,
                    portfolioUrl : userInfo.portfolio_url,
                    minInvestment : userInfo.min_investment,
                    maxInvestment : userInfo.max_investment,
                    socialMediaUrl : userInfo.social_media_url,
                    areaOfInvestment : userInfo.preferred_area_of_investment
                },
                msg:"User successfully fetched"
            }
        }
    } catch (error) {
        return {
            error,
            data : null,
            msg : 'Something went wrong'
        }
    }
}