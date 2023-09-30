import FeedbackRepository from "../model/feedbacks/repo.js";

/**
 * Controller for handling Feedback-related operations.
 */
class FeedbackController {
  /**
   * Create a new Feedback.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createFeedback(req, res) {
    const feedbackData = req.body;
    const result = await FeedbackRepository.createOne(feedbackData);
    res.status(result.code).json(result);
  }

  /**
   * Update a Feedback by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateFeedback(req, res) {
    const feedbackId = req.body.id;
    const newData = req.body.newData;
    const result = await FeedbackRepository.updateById(feedbackId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Feedbacks.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllFeedbacks(req, res) {
    const result = await FeedbackRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get a Feedback by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getFeedbackById(req, res) {
    const feedbackId = req.params.id;
    const result = await FeedbackRepository.getById(feedbackId);
    res.status(result.code).json(result);
  }

  /**
   * Delete a Feedback by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteFeedback(req, res) {
    const feedbackId = req.params.id;
    const result = await FeedbackRepository.deleteById(feedbackId);
    res.status(result.code).json(result);
  }
}

export default new FeedbackController();
