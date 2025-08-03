import { getProfilesForSuggestion } from "../api/getProfilesForSuggestion.js";
import { getUserInfo } from "../services/userService.js"

export const userProfile = async(req,res) => {
    try {
        const userInfo = await getUserInfo(req.userEmail);
        if(userInfo.error){
            res.error(userInfo.msg,userInfo.error);
        }else{
            res.success(userInfo.msg,userInfo.data);
        }
        //res.success('Got user Info',userInfo);
    } catch (error) {
        res.error('something went wrong',error)
    }
}
export const profileSuggestion = async(req,res) => {
    const {userId,userEmail} = req;
    const result = await getProfilesForSuggestion(userId);
    const suggestions = Object.fromEntries(result);
    res.success('Fetched',suggestions,200);
}