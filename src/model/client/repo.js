import Client from "./model.js";
import Matrices from "../matrices/model.js";
import Cart from "../cart/model.js";
import Chat from "../chat/model.js";

class ClientRepository {
  async createOne(clientData) {
    try {
      // Initialize matrices for the client
      const matrices = await Matrices.create({});
      clientData.matrices = matrices._id;

      // Initialize an empty cart for the client
      const cart = await Cart.create({ client: clientData._id, products: [] });
      clientData.cart = cart._id;

      // Initialize an empty chat for the client
      const chat = await Chat.create({ messages: [] });
      clientData.chat = chat._id;

      const client = await Client.create(clientData);

      if (!client || !cart || !matrices) {
        throw new Error("Client could not be created.");
      }
      chat.client = client._id;

      return {
        code: 201,
        success: true,
        data: client,
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

  async getAll() {
    try {
      const clients = await Client.find({})
        .select("createdAt gender email active ")
        .lean();
      return {
        code: 200,
        success: true,
        data: clients,
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

  async getAllPaginated(page, limit) {
    try {
      const clients = await Client.find(
        {},
        {
          first_name,
          last_name,
          gender,
          email,
          mobile_number,
          allow_notifications,
          birthdate,
        }
      )
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        code: 200,
        success: true,
        data: clients,
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

  async get(filter) {
    try {
      const clients = await Client.find(filter).select("-password").lean();
      return {
        code: 200,
        success: true,
        data: clients,
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

  async getById(clientId) {
    try {
      const client = await Client.findById(clientId)
        .select(
          "-password\
      -mobile_number"
        )
        .populate("matrices upComingMeeting program coach subscriptions")
        .lean();
      if (!client) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Client not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: client,
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

  async getOne(filter) {
    try {
      const client = await Client.findOne(filter);
      // .populate(
      //   "matrices upComingMeeting program coach subscriptions"
      // );
      if (!client) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Client not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: client,
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

  async updateById(clientId, updateData) {
    try {
      // Update matrices if provided
      if (updateData.matrices) {
        const updatedMatrices = await Matrices.findByIdAndUpdate(
          updateData.matrices,
          { ...updateData.matrices },
          { new: true }
        );
        updateData.matrices = updatedMatrices._id;
      }

      const updatedClient = await Client.findByIdAndUpdate(
        clientId,
        updateData,
        {
          new: true,
        }
      );

      return {
        code: 200,
        success: true,
        data: updatedClient,
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

  async updateOne(filter, updateData) {
    try {
      const updatedClient = await Client.findOneAndUpdate(filter, updateData, {
        new: true,
      });
      if (!updatedClient) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Client not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedClient,
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

  async deleteById(clientId) {
    try {
      const deletedClient = await Client.findByIdAndDelete(clientId);
      const deletedMatrices = await Matrices.findByIdAndDelete(
        deletedClient.matrices
      );
      const deletedCart = await Cart.findByIdAndDelete(deletedClient.cart);
      if (!deletedClient) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Client not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: deletedClient,
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

export default new ClientRepository();
