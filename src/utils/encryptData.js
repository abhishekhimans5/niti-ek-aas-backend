import bcrypt from 'bcrypt';

const salt = 12;

export const encryptData = async(data) => {
    try{
        const result = await bcrypt.hash(data,salt);
        return {
            error : {},
            hashed : result
        }
    }catch(err){
        return {
            error : 'Something went wrong!',
            data : {}
        }
    }
}

export const compare = async(plain,hashed) => {
    try {
        const isMatched = await bcrypt.compare(plain,hashed);
        return {
            error : null,
            data : isMatched
        }
    } catch (error) {
        return {
            error : error,
            data : null
        }
    }
}