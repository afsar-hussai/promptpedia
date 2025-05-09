import User from "@models/user";
import NextAuth from "next-auth";
import { connectToDB } from "@utils/database";
import GoogleProvider from 'next-auth/providers/google';



const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{

        async session({session}) {
            //all routes are serverless routes
            const sessionUser=await User.findOne({email: session.user.email});
            session.user.id=sessionUser._id.toString();
            return session;
            
            
        },

    async signIn({ profile }){

        try {
            await connectToDB();
            const userExists=await User.findOne({email: profile.email})

            if (!userExists) {
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture,
                })
                
            }
            
            return true;
        } catch (error) {
            console.log("Error checking if user exists: ", error.message);
            return false
        }

    }

}
})

export {handler as GET, handler as POST};