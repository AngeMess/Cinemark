const passwordRecoveryController = {};
import clientsModel from "../models/client.js";
import employeesModel from "../models/employee.js";

import jsonwebtoken, { decode } from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

passwordRecoveryController.requestCode = async (req, res) => {
  const { mail } = req.body;

  try {
    let userFound;
    let userType;
    userFound = await clientsModel.findOne({ mail });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeesModel.findOne({ mail });
      userType = "employee";
    }

    if (!userFound) {
      return res.json({ message: "No se encontro el usuario" });
    }

    const code = Math.floor(10000 + Math.random() * 60000).toString();

    const token = jsonwebtoken.sign(
      { mail, code, userType, verfied: false },
      config.JWT.secret,
      { expiresIn: "25m" }
    );
    res.cookie("tokenRecoveryCode", token, { maxAge: 25 * 60 * 1000 });

    await sendEmail(
      mail,
      "Password recovery Code",
      `your verification code is ${code}`,
      HTMLRecoveryEmail(code)
    );
    res.json({ message: "Código de verificación enviado" });

  } catch (error) {
    console.log("error" + error);
  }
};

passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.json({ message: "Código invalido" });
    }

    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verfied: true,
      },
      config.JWT.secret,
      { expiresIn: "25m" }
    );
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 25 * 60 * 1000 });
    res.json({ message: "Código verificado" });

  } catch (error) {
    console.log("error" + error);
  }
};

passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verfied) {
      return res.json({ message: "Código no verificado" });
    }
    let user;
    const { mail } = decoded;

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    if (decoded.userType === "client") {
      user = await clientsModel.findOneAndUpdate(
        { mail },
        { password: hashedPassword },
        { new: true }
      );
    } else if (decoded.userType === "employee") {
      user = await employeesModel.findOneAndUpdate(
        { mail },
        { password: hashedPassword },
        { new: true }
      );
    }
    res.clearCookie("tokenRecoveryCode");
    res.json({ message: "Contraseña actualizada" });

  } catch (error) {
    console.log("error" + error);
  }
};

export default passwordRecoveryController;