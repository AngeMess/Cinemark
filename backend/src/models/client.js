/*
    Coleccion: Client

    Campos:
        Name
        Mail
        Password
        Phone
        Address
        Active
        
*/

import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 100,
      match: [/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/,],
      required: true
    },
    mail: {
      type: String,
      maxLength: 100,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,],
      required: true
    },
    password: {
      type: String,
      minLength: 7,
      match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,}$/,],
      requerid: true
    },
    phone: {
        type: String,
        requerid: true
    },
    year: {
      type: Number,
      requerid: true
    },
    duration: {
      type: Number,
      requerid: true
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("client", ClientSchema);