import mongoose, { mongo } from "mongoose";

export const connectDB = async ()=> {
    await mongoose.connect('mongodb+srv://malangself:unsafe-0128@cluster0.icmqxm0.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}