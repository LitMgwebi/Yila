//#region Server imports
import { connect } from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { } from 'dotenv/config'
//#endregion

//#region Directory Imports
import log from "./config/logging.js";
import corsOptions from "./config/corsOptions.js";
import backgroundController from "./Controllers/backgroundController.js";
import animationController from "./Controllers/animationController.js";
import characterDesignController from "./Controllers/characterDesignController.js";
import conceptController from "./Controllers/conceptController.js";
import fineArtController from "./Controllers/fineArtController.js";
import translationController from "./Controllers/translationController.js";
import userController from "./Controllers/userController.js";
//#endregion

//#region Server configuration
const dbURL = process.env.DBURL;
const port = process.env.PORT;
const host = process.env.HOST

const server = express();
server.use(express.json());
server.use(cors(corsOptions));
// server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//#endregion

//#region Database configuration
connect(dbURL)
    .then(() => {
        log.info('Connected to database');
        server.listen(port, host, () => {
            log.info(`Listening at: http://${host}:${port}`);
        });
    }).catch((err) => {
        log.error(err);
    })
//#endregion

//#region Routing
server.get('/', (req, res) => {
    res.send("Hi")
});
server.use('/background', backgroundController);
server.use('/fineArt', fineArtController);
server.use('/user', userController);
server.use('/concept', conceptController);
server.use('/characterDesign', characterDesignController);
server.use('/translation', translationController);
server.use('/animation', animationController);
//#endregion