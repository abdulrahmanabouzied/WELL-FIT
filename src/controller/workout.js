import WorkoutRepository from "../model/workout/repo.js";
import fs from "fs";

class WorkoutController {
  /**
   * Create a new workout.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async createWorkout(req, res) {
    const data = req.body;
    let files = req.files;

    const result = await WorkoutRepository.createOne({
      ...data,
      images: files?.images,
      video: files?.video?.length ? files.video[0] : undefined,
    });
    res.status(result.code).json(result);
  }

  /**
   * Update workout details.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateWorkout(req, res) {
    const { id } = req.query;
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
          fs.unlinkSync(img.path);
        });
      data.images = files.images;
    }
    if (files?.video) {
      if (old.data.video) fs.unlinkSync(old.data.video.path);
      data.video = files?.video ? files.video[0] : undefined;
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
    const { id } = req.params;

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
