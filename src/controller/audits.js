import AuditRepository from "../model/audits/repo.js";

/**
 * Controller for handling Audit-related operations.
 */
class AuditController {
  /**
   * Create a new Audit.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createAudit(req, res) {
    const auditData = req.body;
    const result = await AuditRepository.createOne(auditData);
    res.status(result.code).json(result);
  }

  /**
   * Update an Audit by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateAudit(req, res) {
    const auditId = req.body.id;
    const newData = req.body.newData;
    const result = await AuditRepository.updateById(auditId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Audits.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllAudits(req, res) {
    const result = await AuditRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get an Audit by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAuditById(req, res) {
    const auditId = req.params.id;
    const result = await AuditRepository.getById(auditId);
    res.status(result.code).json(result);
  }

  /**
   * Delete an Audit by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteAudit(req, res) {
    const auditId = req.params.id;
    const result = await AuditRepository.deleteById(auditId);
    res.status(result.code).json(result);
  }
}

export default new AuditController();
