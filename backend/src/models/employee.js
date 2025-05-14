/*
    Coleccion: Employee

    Campos:
        Name
        Mail
        Password
        Phone
        Address
        Workstation
        Hiring_date
        Salary
        Active
*/

import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema(
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
      match: [/^\d{4}([- ]?)\d{4}$/,],
      requerid: true
    },
    address: {
      type: String,
      maxLength: 300,
      requerid: true
    },
    workstation: {
      type: String,
      requerid: true
    },
    hiringdate: {
      type: Date,
      requerid: true
    },
    salary: {
      type: Number,
      requerid: true
    },
    active: {
      type: Boolean,
      requerid: true
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", EmployeeSchema);