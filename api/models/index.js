import mongoose from 'mongoose';
import User from './user.js'; // Adjust the path according to your file structure

const dbConnect = () => mongoose.connect('mongodb://localhost:27017/winkwink', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

export default dbConnect