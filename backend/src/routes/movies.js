import express from "express";
import multer from "multer";
import moviesController from "../controllers/MoviesController.js";

const router = express.Router();
const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(moviesController.getmovie)
  .post(upload.single("image"), moviesController.createmovie);

router
  .route("/:id")
  .put(moviesController.deletemovie)
  .delete(upload.single("image"), moviesController.updatemovie);

export default router;