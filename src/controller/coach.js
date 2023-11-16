import CoachRepository from "../model/coach/repo.js";
import genHash from "../utils/genHash.js";
import fs from "fs";
import { removeFile, uploadFile } from "../middlewares/cloudinary.js";

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
      // if (old.data.photo) fs.unlinkSync(old.data.photo.path);
      if (old.data.photo) {
        await removeFile(old.data.photo.url, old.data.photo.public_id);
      }

      // data.photo = files?.photo[0];
      const uploaded = await uploadFile(files.photo[0].path, "data");
      if (uploaded.error) throw new Error(uploaded.error);
      data.photo = uploaded.data;
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
    result.data.upComingMeetings = result?.data?.upComingMeetings?.length ?? 0;
    result.data.clients = result?.data?.clients?.length ?? 0;
    result.data.photo = {
      url: result.data?.photo?.url,
      secure_url: result.data?.photo?.secure_url,
    };
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
    const { id } = req.params;
    const result = await CoachRepository.getById(id);

    result.data = result.data.clients;
    res.status(result.code).json(result);
  }

  async getCoachMeetings(req, res) {
    const { id } = req.params;
    const result = await CoachRepository.getClientsMeetings(id);

    result.data = result.data.clients.map((client) => ({
      id: client._id,
      firstName: client.first_name,
      lastName: client.last_name,
      meeting: client.upComingMeeting,
      photo: client?.photo,
    }));
    res.status(result.code).json(result);
  }
}

export default new CoachController();
