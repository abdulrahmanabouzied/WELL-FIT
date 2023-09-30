import CartRepository from "../model/cart/repo.js";

/**
 * Controller for handling Cart-related operations.
 */
class CartController {
  /**
   * Create a new Cart.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createCart(req, res) {
    const cartData = req.body;
    const result = await CartRepository.createOne(cartData);
    res.status(result.code).json(result);
  }

  /**
   * Update a Cart by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateCart(req, res) {
    const cartId = req.body.id;
    const newData = req.body.newData;
    const result = await CartRepository.updateById(cartId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Carts.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllCarts(req, res) {
    const result = await CartRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get a Cart by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getCartById(req, res) {
    const cartId = req.params.id;
    const result = await CartRepository.getById(cartId);
    res.status(result.code).json(result);
  }

  /**
   * Delete a Cart by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteCart(req, res) {
    const cartId = req.params.id;
    const result = await CartRepository.deleteById(cartId);
    res.status(result.code).json(result);
  }
}

export default new CartController();
