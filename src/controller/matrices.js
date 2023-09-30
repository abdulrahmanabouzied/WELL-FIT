import MatricesRepository from "../model/matrices/repo.js"; // Update with the correct path

class MatricesController {
  /**
   * Get matrices for a specific client.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getClientMatrices(req, res) {
    const matricesId = req.params.id;
    const result = await MatricesRepository.getById(matricesId);
    res.status(result.code).json(result);
  }

  /**
   * Update client matrices.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateClientMatrices(req, res) {
    const matricesId = req.params.id;
    const updateData = req.body;
    const result = await MatricesRepository.updateById(matricesId, updateData);
    res.status(result.code).json(result);
  }
}

export default new MatricesRepository();
