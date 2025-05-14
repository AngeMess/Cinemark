const moviesController = {};
import moviesModel from "../models/movie.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

moviesController.getmovie = async (req, res) => {
    const movies = await moviesModel.find();
    res.json(movies);
};

moviesController.createmovie = async (req, res) => {
    try {
        const { title, description, director, gender, year, duration } = req.body;
        let imageUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"],
            });
            imageUrl = result.secure_url;
        }
        const newmovies = new moviesModel({ title, description, director, gender, year, duration, image: imageUrl });
        newmovies.save();

        res.json({ message: "movie saved" });
    } catch (error) {
        console.log("error" + error);
    }
};

moviesController.deletemovie = async (req, res) => {
    const deletedmovies = await moviesModel.findByIdAndDelete(req.params.id);
    if (!deletedmovies) {
        return res.status(404).json({ message: "movie dont find" });
    }
    res.json({ message: "movie deleted" });
};

moviesController.updatemovie = async (req, res) => {
    try {
        const { title, description, director, gender, year, duration } = req.body;
        let imageUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "public",
                allowed_formats: ["jpg", "png", "jpeg"],
            });
            imageUrl = result.secure_url;
        }
        await moviesModel.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                director,
                gender,
                year,
                duration,
                image: imageUrl
            },
            { new: true }
        );
        res.json({ message: "movie update" });
    } catch (error) {
        console.log("error" + error);
    }
};

export default moviesController;