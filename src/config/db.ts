import mongoose from 'mongoose';
const CONNECTION_STRING = process.env.CONNECTION_STRING;

if(!CONNECTION_STRING) {
    console.error('Connection string is not provided');
    process.exit(1);
}


const connect_db = async() => {
    try {
        console.log('Connecting to database');
        await mongoose.connect(CONNECTION_STRING);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error);
    }
};

export default connect_db;