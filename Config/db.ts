import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const url : any = process.env.MY_URL

export const dbConfig = async () => {
    try {
        await mongoose.connect(url).then(() => {
            console.log("Connected");
        })
    } catch (error) {
        console.log(error);
    }
}