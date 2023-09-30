import Matrices from "./model.js";

class MatricesRepository {
  async createOne(matricesData) {
    try {
      const matrices = await Matrices.create(matricesData);
      return {
        code: 201,
        success: true,
        data: matrices,
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

  async getAll() {
    try {
      const matricesList = await Matrices.find();
      return {
        code: 200,
        success: true,
        data: matricesList,
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
      const matricesList = await Matrices.find()
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        code: 200,
        success: true,
        data: matricesList,
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
      const matricesList = await Matrices.find(filter);
      return {
        code: 200,
        success: true,
        data: matricesList,
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

  async getById(matricesId) {
    try {
      const matrices = await Matrices.findById(matricesId);
      if (!matrices) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Matrices not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: matrices,
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

  async updateById(matricesId, updateData) {
    try {
      const updatedMatrices = await Matrices.findByIdAndUpdate(
        matricesId,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedMatrices) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Matrices not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedMatrices,
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
      const updatedMatrices = await Matrices.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedMatrices) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Matrices not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedMatrices,
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

  async deleteById(matricesId) {
    try {
      const deletedMatrices = await Matrices.findByIdAndDelete(matricesId);
      if (!deletedMatrices) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Matrices not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: deletedMatrices,
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

export default new MatricesRepository();
