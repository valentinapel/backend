import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from'./routes/role.js';
import authRoute from'./routes/auth.js';
import userRoute from'./routes/user.js';
import restaurantRoute from './routes/restaurant.js';
import bar_orderRoute from './routes/bar_order.js';
import kitchenOrderRoute from "./routes/kitchenOrder.js";


import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {origin: "http://localhost:4200" , credentials: true}
));

app.use('/api/role', roleRoute)
app.use("/api/auth", authRoute )
app.use("/api/user", userRoute )
//api to restaurant function
app.use("/api/restaurant", restaurantRoute )
//api to order creation
app.use("/api/bar", bar_orderRoute)
app.use("/api/kitchen", kitchenOrderRoute)


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
    const statusCode=obj.status || 200;
    const message = obj.message || "something went wrong";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status),
        status: statusCode,
        error: message,
        data: obj.data
    })
});

//DB connection
const connectMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to databse")
    }
    catch(error){
        throw error;
    }
}
app.listen(8000, ()=> {
    connectMongoDB();
    console.log("Connected to backend!");
});