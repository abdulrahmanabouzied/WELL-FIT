import Product from "./model.js";

/**
 * Repository for Product model.
 */
class ProductRepository {
  /**
   * Create a new Product.
   * @param {Object} productData - The data for creating the Product.
   * @returns {Promise<Object>} The created Product.
   */
  async createOne(productData) {
    try {
      const product = await Product.create(productData);
      return {
        code: 201,
        success: true,
        data: product,
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
   * Get all Products.
   * @returns {Promise<Object>} All Products.
   */
  async getAll() {
    try {
      const productsList = await Product.find().lean();
      return {
        code: 200,
        success: true,
        data: productsList,
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
   * Get Products with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Products for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const productsList = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        code: 200,
        success: true,
        data: productsList,
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
   * Get Products based on a filter and populate referenced fields.
   * @param {Object} filter - The filter for querying Products.
   * @returns {Promise<Object>} Products that match the filter with populated fields.
   */
  async get(filter) {
    try {
      const productsList = await Product.find(filter).lean();

      return {
        code: 200,
        success: true,
        data: productsList,
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
   * Get a Product by its ID and populate referenced fields if they exist.
   * @param {string} productId - The ID of the Product to retrieve.
   * @returns {Promise<Object>} The Product with the specified ID and populated fields if they exist.
   */
  async getById(productId) {
    try {
      const product = await Product.findById(productId).lean();

      if (!product) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Product not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: product,
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
   * Update a Product by its ID.
   * @param {string} productId - The ID of the Product to update.
   * @param {Object} updateData - The data to update the Product with.
   * @returns {Promise<Object>} The updated Product.
   */
  async updateById(productId, updateData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedProduct) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Product not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedProduct,
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
   * Update a Product based on a filter.
   * @param {Object} filter - The filter for querying the Product to update.
   * @param {Object} updateData - The data to update the Product with.
   * @returns {Promise<Object>} The updated Product.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedProduct) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Product not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedProduct,
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
   * Delete a Product by its ID.
   * @param {string} productId - The ID of the Product to delete.
   * @returns {Promise<Object>} The deleted Product.
   */
  async deleteById(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId).lean();

      if (!deletedProduct) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Product not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedProduct,
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

export default new ProductRepository();
