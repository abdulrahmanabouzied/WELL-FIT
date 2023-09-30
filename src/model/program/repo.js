import Program from "./model.js";

/**
 * Repository for Program model.
 */
class ProgramRepository {
  /**
   * Create a new Program.
   * @param {Object} programData - The data for creating the Program.
   * @returns {Promise<Object>} The created Program.
   */
  async createOne(programData) {
    try {
      const program = await Program.create(programData).lean();
      return {
        code: 201,
        success: true,
        data: program,
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
   * Get all Programs.
   * @returns {Promise<Object>} All Programs.
   */
  async getAll() {
    try {
      const programsList = await Program.find().lean();
      return {
        code: 200,
        success: true,
        data: programsList,
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
   * Get Programs with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Programs for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const programsList = await Program.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        code: 200,
        success: true,
        data: programsList,
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
   * Get Programs based on a filter and populate referenced fields.
   * @param {Object} filter - The filter for querying Programs.
   * @returns {Promise<Object>} Programs that match the filter with populated fields.
   */
  async get(filter) {
    try {
      const programsList = await Program.find(filter)
        .populate("made_by")
        .populate("clients")
        .populate("days_detail.workout.workout")
        .populate("days_detail.nutrition.meal")
        .lean();

      return {
        code: 200,
        success: true,
        data: programsList,
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
   * Get a Program by its ID and populate referenced fields.
   * @param {string} programId - The ID of the Program to retrieve.
   * @returns {Promise<Object>} The Program with the specified ID and populated fields.
   */
  async getById(programId) {
    try {
      const program = await Program.findById(programId)
        .populate("made_by")
        .populate("clients")
        .populate("days_detail.workout.workout")
        .populate("days_detail.nutrition.meal")
        .lean();

      if (!program) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Program not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: program,
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
   * Update a Program by its ID.
   * @param {string} programId - The ID of the Program to update.
   * @param {Object} updateData - The data to update the Program with.
   * @returns {Promise<Object>} The updated Program.
   */
  async updateById(programId, updateData) {
    try {
      const updatedProgram = await Program.findByIdAndUpdate(
        programId,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedProgram) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Program not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedProgram,
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
   * Update a Program based on a filter.
   * @param {Object} filter - The filter for querying the Program to update.
   * @param {Object} updateData - The data to update the Program with.
   * @returns {Promise<Object>} The updated Program.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedProgram = await Program.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      ).lean();

      if (!updatedProgram) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Program not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedProgram,
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
   * Delete a Program by its ID.
   * @param {string} programId - The ID of the Program to delete.
   * @returns {Promise<Object>} The deleted Program.
   */
  async deleteById(programId) {
    try {
      const deletedProgram = await Program.findByIdAndDelete(programId);

      if (!deletedProgram) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Program not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedProgram,
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

export default new ProgramRepository();
