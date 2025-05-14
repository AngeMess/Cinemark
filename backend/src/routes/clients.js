import express from "express";
import clientsController from "../controllers/ClientsController.js";

const router = express.Router();

router
  .route("/")
  .get(clientsController.getclient)
  .post(clientsController.createclient);

router
  .route("/:id")
  .put(clientsController.deleteclient)
  .delete(clientsController.updateclient);

export default router;