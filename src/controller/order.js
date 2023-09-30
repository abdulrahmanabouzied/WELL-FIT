import OrderRepository from "../model/order/repo.js";

/**
 * Controller for handling Order-related operations.
 */
class OrderController {
  /**
   * Create a new Order.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createOrder(req, res) {
    const orderData = req.body;
    const result = await OrderRepository.createOne(orderData);
    res.status(result.code).json(result);
  }

  /**
   * Update an Order by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateOrder(req, res) {
    const { id } = req.query;
    const data = req.body;
    const result = await OrderRepository.updateById(id, data);
    res.status(result.code).json(result);
  }

  /**
   * Get all Orders.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllOrders(req, res) {
    const result = await OrderRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get an Order by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getOrderById(req, res) {
    const orderId = req.params.id;
    const result = await OrderRepository.getById(orderId);
    res.status(result.code).json(result);
  }

  /**
   * Delete an Order by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteOrder(req, res) {
    const orderId = req.params.id;
    const result = await OrderRepository.deleteById(orderId);
    res.status(result.code).json(result);
  }
}

export default new OrderController();
