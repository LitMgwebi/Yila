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
//#endregion

//#region Server configuration
const dbURL = process.env.DBURL;
const port = process.env.PORT;
const host = process.env.HOST

const server = express();
server.use(express.json());
// server.use(cors(corsOptions));
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
server.use("/background", backgroundController);

//#endregion