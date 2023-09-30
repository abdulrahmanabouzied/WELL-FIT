import ChatRepository from "../model/chat/repo.js"; // Update with the correct path

/**
 * Controller for handling Chat-related operations.
 */
class ChatController {
  /**
   * Create a new Chat.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createChat(req, res) {
    const chatData = req.body;
    const result = await ChatRepository.createOne(chatData);
    res.status(result.code).json(result);
  }

  /**
   * Update a Chat by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateChat(req, res) {
    const chatId = req.body.id;
    const newData = req.body.newData;
    const result = await ChatRepository.updateById(chatId, newData);
    res.status(result.code).json(result);
  }

  /**
   * Get all Chats.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllChats(req, res) {
    const result = await ChatRepository.getAll();
    res.status(result.code).json(result);
  }

  /**
   * Get a Chat by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getChatById(req, res) {
    const chatId = req.params.id;
    const result = await ChatRepository.getById(chatId);
    res.status(result.code).json(result);
  }

  /**
   * Delete a Chat by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async deleteChat(req, res) {
    const chatId = req.params.id;
    const result = await ChatRepository.deleteById(chatId);
    res.status(result.code).json(result);
  }
}

export default new ChatController();
