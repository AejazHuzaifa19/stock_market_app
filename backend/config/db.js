const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        mongoose.connect('mongodb+srv://huzaejaz:huzaejaz@cluster0.jaqynny.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;

        db.on('error', (error) => {
            console.error(error);
        });

        db.once('open', () => {
            console.log('Connected to MongoDB!');
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB