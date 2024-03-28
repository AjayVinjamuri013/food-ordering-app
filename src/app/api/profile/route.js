import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import { User } from "@/models/UserModel";

export async function PUT(req){
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  console.log(session)

  if('name' in data){
    await  User.updateOne({email}, {name:data.name});
  }

  return Response.json(true);
}