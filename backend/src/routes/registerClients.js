import express from "express";
import registerClientController from "../controllers/RegisterClientsController.js";

const router = express.Router();

router
    .route("/")
    .post(registerClientController.registerclient);

router
    .route("/verifyCodeEmail")
    .post(registerClientController.verifyCodeEmail);

export default router;