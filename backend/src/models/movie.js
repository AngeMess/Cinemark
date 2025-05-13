/*
    Coleccion: Movie

    Campos:
        Title
        Description
        Director
        Gender
        Year
        Duration
        Image
        
*/

import { Schema, model } from "mongoose";

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      maxLength: 500,
      required: true
    },
    director: {
      type: String,
      requerid: true
    },
    gender: [
      {
        name: {
          type: String,
          required: true
        }
      },
    ],
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

export default model("movie", MovieSchema);