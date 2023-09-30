import Meal from "./model.js";

class MealRepository {
  async createOne(mealData) {
    try {
      const meal = await Meal.create(mealData);
      return {
        code: 201,
        success: true,
        data: meal,
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
      const mealsList = await Meal.find();
      return {
        code: 200,
        success: true,
        data: mealsList,
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
      const mealsList = await Meal.find()
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        code: 200,
        success: true,
        data: mealsList,
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
      const mealsList = await Meal.find(filter);
      return {
        code: 200,
        success: true,
        data: mealsList,
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

  async getById(mealId) {
    try {
      const meal = await Meal.findById(mealId);
      if (!meal) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meal not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: meal,
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

  async updateById(mealId, updateData) {
    try {
      const updatedMeal = await Meal.findByIdAndUpdate(mealId, updateData, {
        new: true,
      });
      if (!updatedMeal) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meal not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedMeal,
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
      const updatedMeal = await Meal.findOneAndUpdate(filter, updateData, {
        new: true,
      });
      if (!updatedMeal) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meal not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedMeal,
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

  async deleteById(mealId) {
    try {
      const deletedMeal = await Meal.findByIdAndDelete(mealId);
      if (!deletedMeal) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meal not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: deletedMeal,
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

export default new MealRepository();
