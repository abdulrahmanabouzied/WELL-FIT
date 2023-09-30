import Shipping from "./model.js";

/**
 * Repository for Shipping model.
 */
class ShippingRepository {
  /**
   * Create a new Shipping.
   * @param {Object} shippingData - The data for creating the Shipping.
   * @returns {Promise<Object>} The created Shipping.
   */
  async createOne(shippingData) {
    try {
      const shipping = await Shipping.create(shippingData);
      return {
        code: 201,
        success: true,
        data: shipping,
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
   * Get all Shippings.
   * @returns {Promise<Object>} All Shippings.
   */
  async getAll() {
    try {
      const shippingsList = await Shipping.find().lean();
      return {
        code: 200,
        success: true,
        data: shippingsList,
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
   * Get Shippings with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Shippings for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const shippingsList = await Shipping.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
      return {
        code: 200,
        success: true,
        data: shippingsList,
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
   * Get Shippings based on a filter and populate referenced fields if available.
   * @param {Object} filter - The filter for querying Shippings.
   * @returns {Promise<Object>} Shippings that match the filter with populated fields if available.
   */
  async get(filter) {
    try {
      const shippingsList = await Shipping.find(filter)
        .populate("client")
        .lean();
      return {
        code: 200,
        success: true,
        data: shippingsList,
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
   * Get a Shipping by its ID and populate referenced fields if available.
   * @param {string} shippingId - The ID of the Shipping to retrieve.
   * @returns {Promise<Object>} The Shipping with the specified ID and populated fields if available.
   */
  async getById(shippingId) {
    try {
      const shipping = await Shipping.findById(shippingId)
        .populate("client")
        .lean();

      if (!shipping) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Shipping not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: shipping,
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
   * Update a Shipping by its ID.
   * @param {string} shippingId - The ID of the Shipping to update.
   * @param {Object} updateData - The data to update the Shipping with.
   * @returns {Promise<Object>} The updated Shipping.
   */
  async updateById(shippingId, updateData) {
    try {
      const updatedShipping = await Shipping.findByIdAndUpdate(
        shippingId,
        updateData,
        { new: true }
      );

      if (!updatedShipping) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Shipping not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedShipping,
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
   * Update a Shipping based on a filter.
   * @param {Object} filter - The filter for querying the Shipping to update.
   * @param {Object} updateData - The data to update the Shipping with.
   * @returns {Promise<Object>} The updated Shipping.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedShipping = await Shipping.findOneAndUpdate(
        filter,
        updateData,
        { new: true }
      );

      if (!updatedShipping) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Shipping not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedShipping,
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
   * Delete a Shipping by its ID.
   * @param {string} shippingId - The ID of the Shipping to delete.
   * @returns {Promise<Object>} The deleted Shipping.
   */
  async deleteById(shippingId) {
    try {
      const deletedShipping = await Shipping.findByIdAndDelete(shippingId);

      if (!deletedShipping) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Shipping not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedShipping,
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

export default new ShippingRepository();
