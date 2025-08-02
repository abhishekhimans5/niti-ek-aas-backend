import mongoose from "mongoose";

const connectMongoDB = async() => {

    const db_url = process.env.MONGO_DB_CLOUD_URL
    try{
        await mongoose.connect(db_url).then(()=>{
            console.log('MongoDB connection successfull...');
        });
        return true;
    }catch(err){
        console.log(`Failed to connect MomgoDB : ${err}`);
        return false;
    }
}

export default connectMongoDB;