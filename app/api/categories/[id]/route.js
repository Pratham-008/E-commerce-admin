import mongoose from "mongoose";
import { categories} from "@/model/categories";
export async function DELETE(req,{params}) {
   const {id}=await params;
   console.log( id)

    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("db is connected");
      } catch (error) {
        console.log("error in database connection");
      }
    
     const resp=await categories.deleteOne({"_id":id})
     console.log(resp);

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }