import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import './node_modules/dotenv/config.js';
import DataRoute from './routes/data.route.js';
import {logger} from './logger/logger.js';
const app = express();

//Middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//Route
app.use('/data', DataRoute)

app.listen(process.env.PORT);

//connecting to Database
mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log(`Server started successfully on Port: ${process.env.PORT}`)
    })
    .catch((error) => {
        logger.error(error.message);
        console.error('Something went Wrong')
    })