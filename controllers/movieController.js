import mongoose from "mongoose";
import Movie from "../models/MovieModel.js";
import { handleResponseError, handleResponseSuccess } from "../utils/response.js";

const getMouvies = async( req, res ) => {
    try {
        const movies = await Movie.find({})
        handleResponseSuccess(res, 200, "Get movies successfully", { movies })
    } catch (error) {
        console.log({ error });
        handleResponseError(res, 500, "Internal Server Error")
    }
}

const getMouvie = async( req, res ) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Invalid movie id")
        return false;
    }

    const checkMovieInDb = await Movie.findById(id)
    if(!checkMovieInDb) {
        handleResponseError(res, 400, "Movie id is not found")
        return false;
    }

    handleResponseSuccess(res, 200, "Get movie successfully", { movie: checkMovieInDb })
}

const createMovie = async( req, res ) => {
    const { title, year, poster } = req.body;
    if(!title || !year ||!poster) {
        handleResponseError(res, 400, "Bad request, all fields is required") ;
        return false;
    }

    try {
        const movie = await Movie.create({ title, year, poster })
        handleResponseSuccess(res, 200, "Movie created successfully", { movie })
    } catch (error) {
        console.log({error});
        handleResponseError(res, 500, "Internal server error")
    }
}

const updateMovie = async ( req, res ) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        handleResponseError(res, 400, "Invalid movie id")
        return false;
    }
    const checkMovieInDb = await Movie.findById(id)
    if(!checkMovieInDb) {
        handleResponseError(res, 400, "Movie id is not found")
        return false;
    }

    try {
        const { title, year, poster } = req.body

        checkMovieInDb.title = title || checkMovieInDb.title
        checkMovieInDb.year = year || checkMovieInDb.year
        checkMovieInDb.poster = poster || checkMovieInDb.year

        await checkMovieInDb.save()
        handleResponseSuccess(res, 200, "Movie is updated", { movie: checkMovieInDb })

    } catch (error) {
        console.log({error});
        handleResponseError(res, 500, "Internal server error")
    }
}

const deleteMovie = async( req, res ) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        handleResponseError(res, 400, "Invalid movie id")
        return false;
    }
    const checkMovieInDb = await Movie.findById(id)
    if(!checkMovieInDb) {
        handleResponseError(res, 400, "Movie id is not found")
        return false;
    }

    try {
        await Movie.findByIdAndDelete(id)  
        handleResponseSuccess(res, 203, "Movie deleted successfully", {})  
    } catch (error) {
        console.log({error});
        handleResponseError(res, 500, "Internal server error")
    }
}

export { getMouvies, getMouvie, createMovie , updateMovie, deleteMovie}