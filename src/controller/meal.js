import MealRepository from "../model/meal/repo.js";
import fs from "fs";

class MealController {
  /**
   * Create a new meal.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async createMeal(req, res) {
    let data = req.body;
    // let video = req.file;
    data.video = req?.file;

    const result = await MealRepository.createOne(data);
    res.status(result.code).json(result);
  }

  /**
   * Update meal details.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateMeal(req, res) {
    const { id } = req.query;
    const data = req.body;
    const video = req.file;

    const old = await MealRepository.getById(id);

    if (!old.data) {
      if (video) fs.unlinkSync(video.path);
      return res.status(old.code).json(old);
    }

    if (video) {
      if (old.data.video) fs.unlinkSync(old.data.video.path);
      data.video = video;
    }
    const result = await MealRepository.updateById(id, data);
    res.status(result.code).json(result);
  }

  /**
   * Get all meals.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllMeals(req, res) {
    const result = await MealRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get meal by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getMealById(req, res) {
    const mealId = req.params.id;
    const result = await MealRepository.getById(mealId);
    res.status(result.code).json(result);
  }

  /**
   * Delete meal by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteMeal(req, res) {
    const mealId = req.params.id;
    const result = await MealRepository.deleteById(mealId);
    res.status(result.code).json(result);
  }
}

export default new MealController();
