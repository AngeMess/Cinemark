const registerClientsController = {};
import clientsModel from "../models/client.js";

import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import { config } from "../config.js";

registerClientsController.registerclient = async (req, res) => {
  const { name, mail, password, phone, address, active } = req.body;
  try {
    const existsClient = await clientsModel.findOne({ mail });
    if (existsClient) {
      return res.json({ message: "Client already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const newclients = new clientsModel({ name, mail, password: passwordHash, phone, address, active });
    await newclients.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");
    const tokenCode = jsonwebtoken.sign(
      { mail, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );
    res.cookie("VerificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    const mailOptions = {
      from: config.email.email_user,
      to: mail,
      subject: "Verificación de correo",
      text: `Para verificar tu correo, utiliza el 
        siguiente código ${verificationCode}\n El codigo 
        vence en dos horas`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.json({ message: "Error" });
      console.log("Correo enviado" + info.response);
    });
    res.json({
      message: "Porfavor revisar su correo por código que se le acaba de ser enviado",
    });

  } catch (error) {
    res.json({ message: "Error" + error });
  }
};

registerClientsController.verifyCodeEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const token = req.cookies.VerificationToken;

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (verificationCode !== storedCode) {
      return res.json({ message: "Código invalido" });
    }

    const client = await clientsModel.findOne({ email });
    client.isVerified = true;
    await client.save();
    res.json({ message: "Correo verificado" });
    res.clearCookie("VerificationToken");
    
  } catch (error) {
    res.json({ message: "error" });
  }
};

export default registerClientsController;