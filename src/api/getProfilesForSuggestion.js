import User from "../model/User.js";
import { SUGGESTION_LIMIT } from "../utils/constants.js";

export const getProfilesForSuggestion = async(idUser) => {
    let suggestionSet = new Map()
    const followingUsers = await getFollowingUsersById(idUser);
    
    for(const idUserFollowing of followingUsers){
        const suggestedUsersIDs = await getFollowingUsersById(idUserFollowing);
        if(suggestedUsersIDs?.length > 0){
            for(const suggestedUserID of suggestedUsersIDs){
                if(!followingUsers.includes(suggestedUserID)){
                    let user = await getUserInfo(suggestedUserID);
                    if(suggestionSet.size > 0 && suggestionSet.size < 3){
                        if(suggestionSet.has(suggestedUserID)){
                           const existingEntry = suggestionSet.get(suggestedUserID);
                              const updatedEntry = {
                                ...existingEntry,
                                followedBy: [...existingEntry.followedBy, await getUserInfo(suggestedUserID)],
                                followedByCount: existingEntry.followedBy.length + 1,
                            };
                              suggestionSet.set(suggestedUserID, updatedEntry);

                        }else{
                            suggestionSet.set(
                                suggestedUserID,
                                {
                                    user,
                                    followedBy : [
                                        await getUserInfo(idUserFollowing)
                                    ],
                                    followedByCount : 1,
                                }
                            );
                        }
                        
                    }
                    else if(suggestionSet.size >= 3){

                    }
                    else{
                        suggestionSet.set(
                            suggestedUserID,
                            {
                                user,
                                followedBy : [
                                    await getUserInfo(idUserFollowing)
                                ],
                                followedByCount : 1,
                            }
                        );
                    }
                }
            }
        }
    }
    if(suggestionSet.length > SUGGESTION_LIMIT){
        suggestionSet = [...suggestionSet]
        return suggestionSet;
    }else{
        suggestionSet = [...suggestionSet]
        return suggestionSet
        //for adding more account
    }
}

export const getFollowingUsersById = async (userid) => {
    let followingUserIdArray = [];

    const user = await User.findById(userid);

    if(user){
        followingUserIdArray = user.following?.idFollowing.map(id => id.toString()) || [];
        return followingUserIdArray;
    }

    return [];

}

const getUserInfo = async(userid) => {
    const user = await User.findById(userid);
    if(user){
        let userInfo = {
            id : user._id,
            name : user.username,
            email : user.email,
            role : user.role,
            isVerified : user.isVerified,
            yearsOfExperience : user.years_of_experience
        }
        return userInfo;
    }
    return {};
}

