import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect_db from './config/db';
import router from './routes/router';

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: '*', 
    credentials: true 
}));
app.use(cookieParser());

connect_db();

app.use('/', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

