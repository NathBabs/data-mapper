import app from './app.js';
import { connectDB } from './database/db.js';
const port = process.env.PORT;

//connect to mongodb
connectDB();

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});