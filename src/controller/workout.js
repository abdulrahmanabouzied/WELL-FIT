import WorkoutRepository from "../model/workout/repo.js";
import fs from "fs";
import {uploadFile, removeFile} from "../middlewares/cloudinary.js";
import {loggers} from "winston";

class WorkoutController {
    /**
     * Create a new workout.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async createWorkout(req, res) {
        const data = req.body;
        let files = req.files;

        let images = files?.images ?
            files.images.map(async (img) => {
                const up = await uploadFile(img.path, 'data');
                if (up.error)
                    throw new Error(up.error);
                return up.data;
            })
            : undefined;
        let video = files?.video ? await Array.from(files.video).map(async video => {
            const up = await uploadFile(video.path, 'data');
            if (up.error)
                throw new Error(up.error);
            return up.data;
        })[0] : undefined;

        if (images)
            images = await Promise.all(images);
        const result = await WorkoutRepository.createOne({
            ...data,
            images: images || undefined,
            video: video || undefined,
        });
        res.status(result.code).json(result);
    }

    /**
     * Update workout details.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async updateWorkout(req, res) {
        const {id} = req.query;
        let data = req.body;
        let files = req.files;

        const old = await WorkoutRepository.getById(id);

        if (!old.data) {
            files.images.forEach((img) => {
                fs.unlinkSync(img.path);
            });
            if (files?.video?.length) fs.unlinkSync(files.video[0].path);

            return res.status(old.code).json(old);
        }

        if (files?.images) {
            if (old.data.images.length)
                old.data.images.forEach((img) => {
                    removeFile(img.resource_type, img.public_id)
                });
            data.images = await Promise.all(files.images.map(async (img) => {
                const up = await uploadFile(img.path, 'data');
                if (up.error)
                    throw new Error(up.error);
                return up.data;
            }));
        }
        if (files?.video) {
            if (old.data.video)
                await removeFile(old.data.video.resource_type, old.data.video.public_id);
            data.video = await files.video.map(async video => {
                const up = await uploadFile(video.path, 'data');
                if (up.error)
                    throw new Error(up.error);
                return up.data;
            })[0];
        }

        const result = await WorkoutRepository.updateById(id, data);
        res.status(result.code).json(result);
    }

    /**
     * Get all workouts.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getAllWorkouts(req, res) {
        const result = await WorkoutRepository.getAll();
        res.status(result.code).json(result);
    }

    /**
     * Get workout by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async getWorkoutById(req, res) {
        const workoutId = req.params.id;
        const result = await WorkoutRepository.getById(workoutId);
        res.status(result.code).json(result);
    }

    /**
     * Delete workout by ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async deleteWorkout(req, res) {
        const {id} = req.params;

        const result = await WorkoutRepository.deleteById(id);
        if (result.data) {
            const workout = result.data;
            workout.images.forEach((img) => {
                fs.unlinkSync(img.path);
            });

            if (workout.video) fs.unlinkSync(workout.video.path);
        }
        res.status(result.code).json(result);
    }
}

export default new WorkoutController();
