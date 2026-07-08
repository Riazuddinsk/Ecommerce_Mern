import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import authRoutes2 from './routes/authRoutes2.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/auth2',authRoutes2);

app.get('/', (req, res )=>{
    res.send ('Api is running..');
});

connectDB();
app.listen(5003,()=>{
    console.log("Server is running on port 5003")
});