import Feedback from "./model.js";

/**
 * Repository for Feedback model.
 */
class FeedbackRepository {
  /**
   * Create a new Feedback.
   * @param {Object} feedbackData - The data for creating the Feedback.
   * @returns {Promise<Object>} The created Feedback.
   */
  async createOne(feedbackData) {
    try {
      const feedback = await Feedback.create(feedbackData);
      return {
        code: 201,
        success: true,
        data: feedback,
        error: null,
      };
    } catch (error) {
      return {
        code: 400,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Get all Feedbacks.
   * @returns {Promise<Object>} All Feedbacks.
   */
  async getAll() {
    try {
      const feedbacksList = await Feedback.find().lean();
      return {
        code: 200,
        success: true,
        data: feedbacksList,
        error: null,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Get Feedbacks with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Feedbacks for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const feedbacksList = await Feedback.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
      return {
        code: 200,
        success: true,
        data: feedbacksList,
        error: null,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Get Feedbacks based on a filter.
   * @param {Object} filter - The filter for querying Feedbacks.
   * @returns {Promise<Object>} Feedbacks that match the filter.
   */
  async get(filter) {
    try {
      const feedbacksList = await Feedback.find(filter).lean();
      return {
        code: 200,
        success: true,
        data: feedbacksList,
        error: null,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Get a Feedback by its ID.
   * @param {string} feedbackId - The ID of the Feedback to retrieve.
   * @returns {Promise<Object>} The Feedback with the specified ID.
   */
  async getById(feedbackId) {
    try {
      const feedback = await Feedback.findById(feedbackId).lean();
      if (!feedback) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Feedback not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: feedback,
        error: null,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Update a Feedback by its ID.
   * @param {string} feedbackId - The ID of the Feedback to update.
   * @param {Object} updateData - The data to update the Feedback with.
   * @returns {Promise<Object>} The updated Feedback.
   */
  async updateById(feedbackId, updateData) {
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        updateData,
        {
          new: true,
        }
      ).lean();
      if (!updatedFeedback) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Feedback not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedFeedback,
        error: null,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Update a Feedback based on a filter.
   * @param {Object} filter - The filter for querying the Feedback to update.
   * @param {Object} updateData - The data to update the Feedback with.
   * @returns {Promise<Object>} The updated Feedback.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedFeedback = await Feedback.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      ).lean();
      if (!updatedFeedback) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Feedback not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedFeedback,
        error: null,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  /**
   * Delete a Feedback by its ID.
   * @param {string} feedbackId - The ID of the Feedback to delete.
   * @returns {Promise<Object>} The deleted Feedback.
   */
  async deleteById(feedbackId) {
    try {
      const deletedFeedback = await Feedback.findByIdAndDelete(
        feedbackId
      ).lean();
      if (!deletedFeedback) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Feedback not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: deletedFeedback,
        error: null,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        data: null,
        error: error.message,
      };
    }
  }
}

export default new FeedbackRepository();
