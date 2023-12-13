import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'; // No need for relative path

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use('/awesome/applicant', userRoutes); // Use the imported router

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app; // Export the app for testing   