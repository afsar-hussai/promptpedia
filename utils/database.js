import mongoose from "mongoose";
let isConnected=false;

export const connectToDB=async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("Already Connected to database");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'share_prompt',
        });

        isConnected=true;
        console.log("MongoDb connected successfully");
        
    } catch (error) {
        console.log(error);
        
        
    }
    
}

