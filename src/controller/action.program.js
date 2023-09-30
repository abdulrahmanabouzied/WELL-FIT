import ActionProgramRepository from "../model/ActionProgram/repo.js";

class ActionProgramController {
  /**
   * Create a new ActionProgram.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async createActionProgram(req, res) {
    const actionProgramData = req.body;
    const result = await ActionProgramRepository.createOne(actionProgramData);
    res.status(result.code).json(result);
  }

  /**
   * Update ActionProgram details.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateActionProgram(req, res) {
    const actionProgramId = req.body.id;
    const newData = req.body.newData;
    const result = await ActionProgramRepository.updateById(
      actionProgramId,
      newData
    );
    res.status(result.code).json(result);
  }

  /**
   * Get all ActionPrograms.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllActionPrograms(req, res) {
    const result = await ActionProgramRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get ActionProgram by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getActionProgramById(req, res) {
    const actionProgramId = req.params.id;
    const result = await ActionProgramRepository.getById(actionProgramId);
    res.status(result.code).json(result);
  }

  /**
   * Delete ActionProgram by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteActionProgram(req, res) {
    const actionProgramId = req.params.id;
    const result = await ActionProgramRepository.deleteById(actionProgramId);
    res.status(result.code).json(result);
  }
}

export default new ActionProgramController();
