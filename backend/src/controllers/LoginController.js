const loginController = {};
import clientsModel from "../models/client.js";
import employeesModel from "../models/employee.js";

import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { config } from "../config.js";

loginController.login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    let userFound;
    let userType;

    if (
      mail === config.emailAdmin.email &&
      password === config.emailAdmin.password
    ) {
      userType = "Admin";
      userFound = { _id: "Admin" };
    } else {
      userFound = await employeesModel.findOne({ mail });
      userType = "Employee";

      if (!userFound) {
        userFound = await clientsModel.findOne({ mail });
        userType = "Client";
      }
    }

    if (!userFound) {
      return res.json({ message: "No se encontro el usuario" });
    }

    if (userType !== "Admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.json({ message: "Contraseña invalida" });
      }
    }

    jsonwebtoken.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.log(error);

        res.cookie("authToken", token);
        res.json({ message: "inicio de sesión exitoso" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export default loginController;