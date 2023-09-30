import ClientRepository from "../model/client/repo.js";
import genHash from "../utils/genHash.js";
import fs from "fs";

/**
 * client controller class to manage routes
 */
class ClientController {
  /**
   * Update a client by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async updateClient(req, res) {
    const { id } = req.query;
    let data = req.body;
    let files = req.files;

    const old = await ClientRepository.getById(id);

    if (!old.data) {
      files.photo.forEach((img) => {
        fs.unlinkSync(img.path);
      });
      files.inbody.forEach((body) => {
        fs.unlinkSync(body.path);
      });

      return res.status(old.code).json(old);
    }

    if (files?.photo) {
      if (old.data.photo) fs.unlinkSync(old.data.photo.path);
      data.photo = files?.photo[0];
    }
    if (files?.inbody) {
      if (old.data.inbody) fs.unlinkSync(old.data.inbody.path);
      data.inbody = files?.inbody[0];
    }

    if (data.password) data.password = await genHash(data.password);

    const result = await ClientRepository.updateById(id, data);
    res.status(result.code).json(result);
  }

  /**
   * Get all clients.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getAllClients(req, res) {
    const result = await ClientRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get a client by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getClientById(req, res) {
    const { id: clientId } = req.params;

    const result = await ClientRepository.getById(clientId);
    res.status(result.code).json(result);
  }

  /**
   * Get a client Mats.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async getClientMats(req, res) {
    const { id: clientId } = req.params;

    const result = await ClientRepository.getById(clientId);
    const {
      data: { matrices },
    } = result;

    res.status(result.code).json({
      code: result.code,
      success: result.success,
      data: matrices,
    });
  }

  /**
   * Delete a client by ID.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteClient(req, res) {
    const { id: clientId } = req.params;

    const result = await ClientRepository.deleteById(clientId);
    res.status(result.code).json(result);
  }
}

export default new ClientController();
