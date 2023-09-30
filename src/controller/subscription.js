import SubscriptionRepository from "../model/subscription/repo.js";

/**
 * Controller for handling Subscription operations.
 */
class SubscriptionController {
  /**
   * Create a new Subscription.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createSubscription(req, res) {
    const subscriptionData = req.body;
    const result = await SubscriptionRepository.createOne(subscriptionData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Subscriptions.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllSubscriptions(req, res) {
    const result = await SubscriptionRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get all Subscriptions with pagination.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllPaginatedSubscriptions(req, res) {
    const { page, limit } = req.query;
    const result = await SubscriptionRepository.getAllPaginated(
      parseInt(page, 10),
      parseInt(limit, 10)
    );
    res.status(result.code).json(result);
  }

  /**
   * Get a Subscription by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getSubscriptionById(req, res) {
    const { id } = req.params;
    const result = await SubscriptionRepository.getById(id);
    res.status(result.code).json(result);
  }

  /**
   * Update a Subscription by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateSubscriptionById(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const result = await SubscriptionRepository.updateById(id, updateData);
    res.status(result.code).json(result);
  }

  /**
   * Update a Subscription based on a filter.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateSubscription(req, res) {
    const filter = req.body.filter;
    const updateData = req.body.updateData;
    const result = await SubscriptionRepository.updateOne(filter, updateData);
    res.status(result.code).json(result);
  }

  /**
   * Delete a Subscription by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteSubscriptionById(req, res) {
    const { id } = req.params;
    const result = await SubscriptionRepository.deleteById(id);
    res.status(result.code).json(result);
  }
}

export default new SubscriptionController();
