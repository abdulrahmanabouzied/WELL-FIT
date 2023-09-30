import Audit from "./model.js";

/**
 * Repository for Audit model.
 */
class AuditRepository {
  /**
   * Create a new Audit entry.
   * @param {Object} auditData - The data for creating the Audit entry.
   * @returns {Promise<Object>} The created Audit entry.
   */
  async createOne(auditData) {
    try {
      const audit = await Audit.create(auditData);
      return {
        code: 201,
        success: true,
        data: audit,
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
   * Get all Audit entries.
   * @returns {Promise<Object>} All Audit entries.
   */
  async getAll() {
    try {
      const auditsList = await Audit.find().lean();
      return {
        code: 200,
        success: true,
        data: auditsList,
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
   * Get Audit entries with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Audits for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const auditsList = await Audit.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
      return {
        code: 200,
        success: true,
        data: auditsList,
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
   * Get Audits based on a filter.
   * @param {Object} filter - The filter for querying Audits.
   * @returns {Promise<Object>} Audits that match the filter.
   */
  async get(filter) {
    try {
      const auditsList = await Audit.find(filter).lean();
      return {
        code: 200,
        success: true,
        data: auditsList,
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
   * Get an Audit entry by its ID.
   * @param {string} auditId - The ID of the Audit entry to retrieve.
   * @returns {Promise<Object>} The Audit entry with the specified ID.
   */
  async getById(auditId) {
    try {
      const audit = await Audit.findById(auditId).lean();

      if (!audit) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Audit not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: audit,
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
   * Update an Audit entry by its ID.
   * @param {string} auditId - The ID of the Audit entry to update.
   * @param {Object} updateData - The data to update the Audit entry with.
   * @returns {Promise<Object>} The updated Audit entry.
   */
  async updateById(auditId, updateData) {
    try {
      const updatedAudit = await Audit.findByIdAndUpdate(auditId, updateData, {
        new: true,
      }).lean();

      if (!updatedAudit) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Audit not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedAudit,
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
   * Update an Audit entry based on a filter.
   * @param {Object} filter - The filter for querying the Audit entry to update.
   * @param {Object} updateData - The data to update the Audit entry with.
   * @returns {Promise<Object>} The updated Audit entry.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedAudit = await Audit.findOneAndUpdate(filter, updateData, {
        new: true,
      }).lean();

      if (!updatedAudit) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Audit not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedAudit,
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
   * Delete an Audit entry by its ID.
   * @param {string} auditId - The ID of the Audit entry to delete.
   * @returns {Promise<Object>} The deleted Audit entry.
   */
  async deleteById(auditId) {
    try {
      const deletedAudit = await Audit.findByIdAndDelete(auditId).lean();

      if (!deletedAudit) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Audit not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedAudit,
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

export default new AuditRepository();
