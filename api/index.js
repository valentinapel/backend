import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from'./routes/role.js';
import authRoute from'./routes/auth.js'

dotenv.config();
const app = express();

app.use(express.json());
//DB Connection

app.use('/api/role', roleRoute)
app.use("/api/auth", authRoute )

//error handler middleware
app.use((err,req,res,next)=>{
    const statusCode=err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(statusCode).json({
        success:false,
        status: statusCode,
        error: errorMessage
    })
});

//succcess handler middleware
app.use((obj,req,res,next)=>{
    const statusCode=obj.status || 500;
    const message = obj.message || "something went wrong";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status),
        status: statusCode,
        error: message,
        data: obj.data
    })
});

const connectMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to databse")
    }
    catch(error){
        throw error;
    }
}
app.listen(8800, ()=> {
    connectMongoDB();
    console.log("Connected to backend!");
});