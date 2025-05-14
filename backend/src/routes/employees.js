import express from "express";
import employeesController from "../controllers/EmployeesController.js";

const router = express.Router();

router
  .route("/")
  .get(employeesController.getemployee)
  .post(employeesController.createemployee);

router
  .route("/:id")
  .put(employeesController.deleteemployee)
  .delete(employeesController.updateemployee);

export default router;