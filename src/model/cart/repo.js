import Cart from "./model.js";

/**
 * Repository for Cart model.
 */
class CartRepository {
  /**
   * Create a new Cart.
   * @param {Object} cartData - The data for creating the Cart.
   * @returns {Promise<Object>} The created Cart.
   */
  async createOne(cartData) {
    try {
      const cart = await Cart.create(cartData);
      return {
        code: 201,
        success: true,
        data: cart,
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
   * Get all Carts.
   * @returns {Promise<Object>} All Carts.
   */
  async getAll() {
    try {
      const cartsList = await Cart.find().lean();
      return {
        code: 200,
        success: true,
        data: cartsList,
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
   * Get Carts with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Carts for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const cartsList = await Cart.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        code: 200,
        success: true,
        data: cartsList,
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
   * Get Carts based on a filter and populate referenced fields.
   * @param {Object} filter - The filter for querying Carts.
   * @returns {Promise<Object>} Carts that match the filter with populated fields.
   */
  async get(filter) {
    try {
      const cartsList = await Cart.find(filter)
        .populate("client")
        .populate("products.product")
        .lean();

      return {
        code: 200,
        success: true,
        data: cartsList,
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
   * Get a Cart by its ID and populate referenced fields if they exist.
   * @param {string} cartId - The ID of the Cart to retrieve.
   * @returns {Promise<Object>} The Cart with the specified ID and populated fields if they exist.
   */
  async getById(cartId) {
    try {
      const cart = await Cart.findById(cartId)
        .populate("client")
        .populate("products.product")
        .lean();

      if (!cart) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Cart not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: cart,
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
   * Update a Cart by its ID.
   * @param {string} cartId - The ID of the Cart to update.
   * @param {Object} updateData - The data to update the Cart with.
   * @returns {Promise<Object>} The updated Cart.
   */
  async updateById(cartId, updateData) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(cartId, updateData, {
        new: true,
      }).lean();

      if (!updatedCart) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Cart not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedCart,
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
   * Update a Cart based on a filter.
   * @param {Object} filter - The filter for querying the Cart to update.
   * @param {Object} updateData - The data to update the Cart with.
   * @returns {Promise<Object>} The updated Cart.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedCart = await Cart.findOneAndUpdate(filter, updateData, {
        new: true,
      }).lean();

      if (!updatedCart) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Cart not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedCart,
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
   * Delete a Cart by its ID.
   * @param {string} cartId - The ID of the Cart to delete.
   * @returns {Promise<Object>} The deleted Cart.
   */
  async deleteById(cartId) {
    try {
      const deletedCart = await Cart.findByIdAndDelete(cartId).lean();

      if (!deletedCart) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Cart not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedCart,
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

export default new CartRepository();
