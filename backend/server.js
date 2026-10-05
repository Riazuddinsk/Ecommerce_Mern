import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import authRoutes2 from './routes/authRoutes2.js';
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import addressRouter from "./routes/addressRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/auth2',authRoutes2);
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)

app.get('/', (req, res )=>{
    res.send ('Api is running..');
});

connectDB();

app.listen(5003,()=>{
    console.log("Server is running on port 5003")
});