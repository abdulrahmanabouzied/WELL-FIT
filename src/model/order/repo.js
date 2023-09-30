import Order from "./model.js";

/**
 * Repository for Order model.
 */
class OrderRepository {
  /**
   * Create a new Order.
   * @param {Object} orderData - The data for creating the Order.
   * @returns {Promise<Object>} The created Order.
   */
  async createOne(orderData) {
    try {
      const order = await Order.create(orderData);
      return {
        code: 201,
        success: true,
        data: order,
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
   * Get all Orders.
   * @returns {Promise<Object>} All Orders.
   */
  async getAll() {
    try {
      const ordersList = await Order.find().lean();
      return {
        code: 200,
        success: true,
        data: ordersList,
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
   * Get Orders with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Orders for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const ordersList = await Order.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        code: 200,
        success: true,
        data: ordersList,
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
   * Get Orders based on a filter and populate referenced fields.
   * @param {Object} filter - The filter for querying Orders.
   * @returns {Promise<Object>} Orders that match the filter with populated fields.
   */
  async get(filter) {
    try {
      const ordersList = await Order.find(filter)
        .populate("client")
        .populate({
          path: "products.product",
          model: "Products",
        })
        .populate("shipping")
        .lean();

      return {
        code: 200,
        success: true,
        data: ordersList,
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
   * Get an Order by its ID and populate referenced fields if they exist.
   * @param {string} orderId - The ID of the Order to retrieve.
   * @returns {Promise<Object>} The Order with the specified ID and populated fields if they exist.
   */
  async getById(orderId) {
    try {
      const order = await Order.findById(orderId)
        .populate("client")
        .populate({
          path: "products.product",
          model: "Products",
        })
        .populate("shipping")
        .lean();

      if (!order) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Order not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: order,
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
   * Update an Order by its ID.
   * @param {string} orderId - The ID of the Order to update.
   * @param {Object} updateData - The data to update the Order with.
   * @returns {Promise<Object>} The updated Order.
   */
  async updateById(orderId, updateData) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
        new: true,
      }).lean();

      if (!updatedOrder) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Order not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedOrder,
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
   * Update an Order based on a filter.
   * @param {Object} filter - The filter for querying the Order to update.
   * @param {Object} updateData - The data to update the Order with.
   * @returns {Promise<Object>} The updated Order.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedOrder = await Order.findOneAndUpdate(filter, updateData, {
        new: true,
      }).lean();

      if (!updatedOrder) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Order not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedOrder,
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
   * Delete an Order by its ID.
   * @param {string} orderId - The ID of the Order to delete.
   * @returns {Promise<Object>} The deleted Order.
   */
  async deleteById(orderId) {
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId).lean();

      if (!deletedOrder) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Order not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedOrder,
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

export default new OrderRepository();
