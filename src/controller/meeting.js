import MeetingRepository from "../model/meeting/repo.js";

/**
 * Controller for handling Meeting-related operations.
 */
class MeetingController {
  /**
   * Create a new Meeting.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createMeeting(req, res) {
    const meetingData = req.body;
    const result = await MeetingRepository.createOne(meetingData);
    res.status(result.code).json(result);
  }

  /**
   * Update a Meeting by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateMeeting(req, res) {
    const meetingId = req.body.id;
    const newData = req.body.newData;
    const result = await MeetingRepository.updateById(meetingId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Meetings.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllMeetings(req, res) {
    const result = await MeetingRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get a Meeting by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getMeetingById(req, res) {
    const meetingId = req.params.id;
    const result = await MeetingRepository.getById(meetingId);
    res.status(result.code).json(result);
  }

  /**
   * Delete a Meeting by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteMeeting(req, res) {
    const meetingId = req.params.id;
    const result = await MeetingRepository.deleteById(meetingId);
    res.status(result.code).json(result);
  }
}

export default new MeetingController();
