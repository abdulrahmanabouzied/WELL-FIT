import ProgramRepository from "../model/program/repo.js";

class ProgramController {
  /**
   * Create a new program.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async createProgram(req, res) {
    const programData = req.body;
    const result = await ProgramRepository.createOne(programData);
    res.status(result.code).json(result);
  }

  /**
   * Update program details.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateProgram(req, res) {
    const programId = req.body.id;
    const newData = req.body.newData;
    const result = await ProgramRepository.updateById(programId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all programs.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllPrograms(req, res) {
    const result = await ProgramRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get program by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getProgramById(req, res) {
    const programId = req.params.id;
    const result = await ProgramRepository.getById(programId);
    res.status(result.code).json(result);
  }

  /**
   * Delete program by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteProgram(req, res) {
    const programId = req.params.id;
    const result = await ProgramRepository.deleteById(programId);
    res.status(result.code).json(result);
  }
}

export default new ProgramController();
