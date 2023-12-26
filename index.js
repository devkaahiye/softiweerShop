import express from 'express';
import ConnectToDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';

dotenv.config()
const app = express()
ConnectToDb()

const port = process.env.PORT || 5000


app.use(express.json())
app.use('/api/users/',userRoutes)
app.use('/api/products/', productRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})