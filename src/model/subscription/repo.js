import Subscription from "./model.js";

/**
 * Repository for handling Subscription model operations.
 */
class SubscriptionRepository {
  /**
   * Create a new Subscription.
   * @param {Object} subscriptionData - The data for creating the Subscription.
   * @returns {Promise<Object>} The created Subscription.
   */
  async createOne(subscriptionData) {
    try {
      const subscription = await Subscription.create(subscriptionData);
      return {
        code: 201,
        success: true,
        data: subscription,
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
   * Get all Subscriptions.
   * @returns {Promise<Object>} All Subscriptions.
   */
  async getAll() {
    try {
      const subscriptionsList = await Subscription.find().lean();
      return {
        code: 200,
        success: true,
        data: subscriptionsList,
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
   * Get Subscriptions with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Subscriptions for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const subscriptionsList = await Subscription.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
      return {
        code: 200,
        success: true,
        data: subscriptionsList,
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
   * Get Subscriptions based on a filter.
   * @param {Object} filter - The filter for querying Subscriptions.
   * @returns {Promise<Object>} Subscriptions that match the filter.
   */
  async get(filter) {
    try {
      const subscriptionsList = await Subscription.find(filter).lean();
      return {
        code: 200,
        success: true,
        data: subscriptionsList,
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
   * Get a Subscription by its ID.
   * @param {string} subscriptionId - The ID of the Subscription to retrieve.
   * @returns {Promise<Object>} The Subscription with the specified ID.
   */
  async getById(subscriptionId) {
    try {
      const subscription = await Subscription.findById(subscriptionId).lean();

      if (!subscription) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Subscription not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: subscription,
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
   * Update a Subscription by its ID.
   * @param {string} subscriptionId - The ID of the Subscription to update.
   * @param {Object} updateData - The data to update the Subscription with.
   * @returns {Promise<Object>} The updated Subscription.
   */
  async updateById(subscriptionId, updateData) {
    try {
      const updatedSubscription = await Subscription.findByIdAndUpdate(
        subscriptionId,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedSubscription) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Subscription not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedSubscription,
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
   * Update a Subscription based on a filter.
   * @param {Object} filter - The filter for querying the Subscription to update.
   * @param {Object} updateData - The data to update the Subscription with.
   * @returns {Promise<Object>} The updated Subscription.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedSubscription = await Subscription.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedSubscription) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Subscription not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedSubscription,
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
   * Delete a Subscription by its ID.
   * @param {string} subscriptionId - The ID of the Subscription to delete.
   * @returns {Promise<Object>} The deleted Subscription.
   */
  async deleteById(subscriptionId) {
    try {
      const deletedSubscription = await Subscription.findByIdAndDelete(
        subscriptionId
      ).lean();

      if (!deletedSubscription) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Subscription not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedSubscription,
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

export default new SubscriptionRepository();
