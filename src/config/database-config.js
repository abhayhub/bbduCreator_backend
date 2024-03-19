import mongoose from "mongoose";
import 'dotenv/config';

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

export default connect;