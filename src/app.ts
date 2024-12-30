import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect_db from './config/db';
import router from './routes/router';
import Message from './models/Message';
import http from 'http';
import initSocket from './socket/socket';
import fs from 'fs';

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



const server = http.createServer(app);
initSocket(server);

app.use('/', router);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

