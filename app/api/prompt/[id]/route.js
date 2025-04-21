// GET

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

export const GET=async (req ,{ params })=>{
    try {
        const {id}=await params;
        await connectToDB();
        const prompts=await Prompt.findById(id).populate("creator");
        if(!prompts) return new Response("Prompt Doesn't Exist",{status:404});
        return new Response(JSON.stringify(prompts),{status: 200});
    } catch (error) {

        return new Response("Failed to Fetch Prompts",{status:500});
        
    }
}
//PATCH


export const PATCH=async (req, { params })=>{
    const { id }=await params;
    const { prompt , tag }=await req.json();
    try {
        await connectToDB();
        const existingPrompt=await Prompt.findById(id).populate("creator");
        if(!existingPrompt) return new Response("Prompt Not Found",{status:404});
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();
        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Failed to update Prompt Due to Internal Error",{status:500})
    }
}
// DELETE

export const DELETE=async (req, { params })=>{
    const { id }=await params;
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(id);
        return new Response("Prompt Deleted Successfully",{status:200})
    } catch (error) {
        return new Response("Failed to Delete Prompt Due to Internal Error",{status:500});
    }
}