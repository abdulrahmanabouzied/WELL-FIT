import ProductRepository from "../model/product/repo.js";

/**
 * Controller for handling Product-related operations.
 */
class ProductController {
  /**
   * Create a new Product.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createProduct(req, res) {
    const productData = req.body;
    const result = await ProductRepository.createOne(productData);
    res.status(result.code).json(result);
  }

  /**
   * Update a Product by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateProduct(req, res) {
    const productId = req.body.id;
    const newData = req.body.newData;
    const result = await ProductRepository.updateById(productId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Products.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllProducts(req, res) {
    const result = await ProductRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get a Product by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getProductById(req, res) {
    const productId = req.params.id;
    const result = await ProductRepository.getById(productId);
    res.status(result.code).json(result);
  }

  /**
   * Delete a Product by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteProduct(req, res) {
    const productId = req.params.id;
    const result = await ProductRepository.deleteById(productId);
    res.status(result.code).json(result);
  }
}

export default new ProductController();
