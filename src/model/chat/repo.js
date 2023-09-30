import Chat from "./model.js";

/**
 * Repository for Chat model.
 */
class ChatRepository {
  /**
   * Create a new Chat.
   * @param {Object} chatData - The data for creating the Chat.
   * @returns {Promise<Object>} The created Chat.
   */
  async createOne(chatData) {
    try {
      const chat = await Chat.create(chatData);
      return {
        code: 201,
        success: true,
        data: chat,
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
   * Get all Chats.
   * @returns {Promise<Object>} All Chats.
   */
  async getAll() {
    try {
      const chatsList = await Chat.find().lean();
      return {
        code: 200,
        success: true,
        data: chatsList,
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
   * Get Chats with pagination.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<Object>} Chats for the specified page.
   */
  async getAllPaginated(page, limit) {
    try {
      const chatsList = await Chat.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
      return {
        code: 200,
        success: true,
        data: chatsList,
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
   * Get Chats based on a filter and populate referenced fields if available.
   * @param {Object} filter - The filter for querying Chats.
   * @returns {Promise<Object>} Chats that match the filter with populated fields if available.
   */
  async get(filter) {
    try {
      const chatsList = await Chat.find(filter)
        .populate("coach")
        .populate("client")
        .lean();

      return {
        code: 200,
        success: true,
        data: chatsList,
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
   * Get a Chat by its ID and populate referenced fields if available.
   * @param {string} chatId - The ID of the Chat to retrieve.
   * @returns {Promise<Object>} The Chat with the specified ID and populated fields if available.
   */
  async getById(chatId) {
    try {
      const chat = await Chat.findById(chatId)
        .populate("coach")
        .populate("client")
        .lean();

      if (!chat) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Chat not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: chat,
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
   * Update a Chat by its ID.
   * @param {string} chatId - The ID of the Chat to update.
   * @param {Object} updateData - The data to update the Chat with.
   * @returns {Promise<Object>} The updated Chat.
   */
  async updateById(chatId, updateData) {
    try {
      const updatedChat = await Chat.findByIdAndUpdate(chatId, updateData, {
        new: true,
      });

      if (!updatedChat) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Chat not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedChat,
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
   * Update a Chat based on a filter.
   * @param {Object} filter - The filter for querying the Chat to update.
   * @param {Object} updateData - The data to update the Chat with.
   * @returns {Promise<Object>} The updated Chat.
   */
  async updateOne(filter, updateData) {
    try {
      const updatedChat = await Chat.findOneAndUpdate(filter, updateData, {
        new: true,
      });

      if (!updatedChat) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Chat not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: updatedChat,
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
   * Delete a Chat by its ID.
   * @param {string} chatId - The ID of the Chat to delete.
   * @returns {Promise<Object>} The deleted Chat.
   */
  async deleteById(chatId) {
    try {
      const deletedChat = await Chat.findByIdAndDelete(chatId);

      if (!deletedChat) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Chat not found",
        };
      }

      return {
        code: 200,
        success: true,
        data: deletedChat,
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

export default new ChatRepository();
