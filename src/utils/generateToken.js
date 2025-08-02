import jwt from 'jsonwebtoken';

export const generateToken = async(user) => {

    return await jwt.sign(
        {
            id : user.id,
            email : user.email,
            role : user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '7d'
        }
    )
}