import ShippingRepository from "../model/shipping/repo.js";

/**
 * Controller for handling Shipping-related operations.
 */
class ShippingController {
  /**
   * Create a new Shipping.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createShipping(req, res) {
    const shippingData = req.body;
    const result = await ShippingRepository.createOne(shippingData);
    res.status(result.code).json(result);
  }

  /**
   * Update a Shipping by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateShipping(req, res) {
    const shippingId = req.body.id;
    const newData = req.body.newData;
    const result = await ShippingRepository.updateById(shippingId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Shippings.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllShippings(req, res) {
    const result = await ShippingRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get a Shipping by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getShippingById(req, res) {
    const shippingId = req.params.id;
    const result = await ShippingRepository.getById(shippingId);
    res.status(result.code).json(result);
  }

  /**
   * Delete a Shipping by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteShipping(req, res) {
    const shippingId = req.params.id;
    const result = await ShippingRepository.deleteById(shippingId);
    res.status(result.code).json(result);
  }
}

export default new ShippingController();
