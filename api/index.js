import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from'./routes/role.js';
import authRoute from'./routes/auth.js'

dotenv.config();
const app = express();

app.use(express.json());
//DB Connection
const connectMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to databse")
    }
    catch(error){
        throw error;
    }
}

app.use('/api/role', roleRoute)
app.use("/api/auth", authRoute )
/*pp.use('/api/login', (req,res)=>{
    return res.send("login is success!");
    }
)

app.use('/api/register', (req,res)=>{
        return res.send("register is success!!");
    }
)

app.use('/', (req,res)=>{
        return res.send("hallooo")
    }
);
*/
app.listen(8800, ()=> {
    connectMongoDB();
    console.log("Connected to backend!");
});