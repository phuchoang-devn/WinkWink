import mongoose from 'mongoose';

const dbConnect = () => mongoose.connect(process.env.DB_SERVER).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

export default dbConnect