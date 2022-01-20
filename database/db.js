import pkg from 'mongoose';
const { connect } = pkg;

export async function connectDB() {
    try {
        const conn = await connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
