import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

export const GET=async (req ,{ params })=>{
    try {
        const {id}=await params;
        await connectToDB();
        const prompts=await Prompt.find({creator:id}).populate("creator");
        return new Response(JSON.stringify(prompts),{status: 200});
    } catch (error) {

        return new Response("Failed to Fetch Prompts",{status:500});
        
    }
}