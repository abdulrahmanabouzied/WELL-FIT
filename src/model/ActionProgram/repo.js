import ActionProgram from "./model.js";

class ActionProgramRepository {
  /**
   * createOne: Create a new ActionProgram.
   * @param {Object} actionProgramData - The data for creating the ActionProgram.
   * @returns {Promise<Object>} The created ActionProgram.
   */
  async createOne(actionProgramData) {
    try {
      const actionProgram = await ActionProgram.create(actionProgramData);
      return {
        code: 201,
        success: true,
        data: actionProgram,
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
   * getAll: Get all ActionPrograms.
   * @returns {Promise<Object>} All ActionPrograms.
   */
  async getAll() {
    try {
      const actionProgramsList = await ActionProgram.find().lean();
      return {
        code: 200,
        success: true,
        data: actionProgramsList,
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
   * getAllPaginated: Get ActionPrograms with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} ActionPrograms for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const actionProgramsList = await ActionProgram.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        code: 200,
        success: true,
        data: actionProgramsList,
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
   * get: Get ActionPrograms based on a filter.
   * @param {Object} filter - The filter for querying ActionPrograms.
   * @returns {Promise<Object>} ActionPrograms that match the filter.
   */
  async get(filter) {
    try {
      const actionProgramsList = await ActionProgram.find(filter).lean();
      return {
        code: 200,
        success: true,
        data: actionProgramsList,
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
   * getById: Get an ActionProgram by its ID and populate referenced fields.
   * @param {string} actionProgramId - The ID of the ActionProgram to retrieve.
   * @returns {Promise<Object>} The ActionProgram with the specified ID and populated fields.
   */
  async getById(actionProgramId) {
    try {
      const actionProgram = await ActionProgram.findById(actionProgramId)
        .populate("program.template")
        .populate("program.day_details.workout.workout")
        .populate("program.day_details.nutrition.meal")
        .lean();

      if (!actionProgram) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "ActionProgram not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: actionProgram,
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
   * updateById: Update an ActionProgram by its ID.
   * @param {string} actionProgramId - The ID of the ActionProgram to update.
   * @param {Object} updateData - The data to update the ActionProgram with.
   * @returns {Promise<Object>} The updated ActionProgram.
   */
  async updateById(actionProgramId, updateData) {
    try {
      const updatedActionProgram = await ActionProgram.findByIdAndUpdate(
        actionProgramId,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedActionProgram) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "ActionProgram not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedActionProgram,
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
   * updateOne: Update an ActionProgram based on a filter.
   * @param {Object} filter - The filter for querying the ActionProgram to update.
   * @param {Object} updateData - The data to update the ActionProgram with.
   * @returns {Promise<Object>} The updated ActionProgram.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedActionProgram = await ActionProgram.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedActionProgram) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "ActionProgram not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedActionProgram,
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
   * deleteById: Delete an ActionProgram by its ID.
   * @param {string} actionProgramId - The ID of the ActionProgram to delete.
   * @returns {Promise<Object>} The deleted ActionProgram.
   */
  async deleteById(actionProgramId) {
    try {
      const deletedActionProgram = await ActionProgram.findByIdAndDelete(
        actionProgramId
      ).lean();

      if (!deletedActionProgram) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "ActionProgram not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedActionProgram,
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

export default new ActionProgramRepository();
