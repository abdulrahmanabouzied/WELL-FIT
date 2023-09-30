import CoachRepository from "../model/coach/repo.js";
import genHash from "../utils/genHash.js";
import fs from "fs";

class CoachController {
  /**
   * Register a new coach.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async registerCoach(req, res) {
    const coachData = req.body;
    const result = await CoachRepository.createOne(coachData);
    res.status(result.code).json(result);
  }

  /**
   * Update coach details.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateCoach(req, res) {
    const { id } = req.query;
    let data = req.body;
    let files = req.files;

    if (data.password) data.password = await genHash(data.password);

    const old = await CoachRepository.getById(id);

    if (!old.data) {
      files.photo.forEach((img) => {
        fs.unlinkSync(img.path);
      });

      return res.status(old.code).json(old);
    }
    if (files?.photo) {
      if (old.data.photo) fs.unlinkSync(old.data.photo.path);
      data.photo = files?.photo[0];
    }

    const result = await CoachRepository.updateById(id, data);
    res.status(result.code).json(result);
  }

  /**
   * Get all coaches.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllCoaches(req, res) {
    const result = await CoachRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get coach by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getCoachById(req, res) {
    const coachId = req.params.id;
    const result = await CoachRepository.getById(coachId);
    res.status(result.code).json(result);
  }

  /**
   * Delete coach by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteCoach(req, res) {
    const coachId = req.params.id;
    const result = await CoachRepository.deleteById(coachId);
    res.status(result.code).json(result);
  }

  /**
   * Get coach clients by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getCoachClients(req, res) {
    const coachId = req.params.id;
    const result = await CoachRepository.getById(coachId);
    result.data = result.data.clients;
    res.status(result.code).json(result);
  }
}

export default new CoachController();
