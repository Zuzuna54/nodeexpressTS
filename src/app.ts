require('dotenv').config();
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'; // No need for relative path
import Logger from './logger/Logger';


// The main function is async so we can use await
const main = async () => {

    // Create a new express app instance
    const app: Express = express();
    const port: string | undefined = process.env.PORT || "8002";

    // The express.json() middleware parses JSON bodies of incoming requests
    app.use(bodyParser.json());
    // The express.urlencoded() middleware parses urlencoded bodies of incoming requests
    app.use('/awesome/applicant', userRoutes); // Use the imported router

    // Start the server
    app.listen(port, () => {

        Logger.info(`Server started at http://localhost:${port}`);

    }).on('error', (err: Error) => {

        Logger.error(err.message);

    })
};

// Call the main function
main().catch((err) => {
    console.log(err);
});