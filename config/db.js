import mongoose from "mongoose";

const connectToDatabase = async() => {
    try {
        const db = await mongoose.connect(process.env.DB_URI, { dbName: 'demo_db'})
        console.log('Connected to demo_db ' + db.connection.host )
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDatabase