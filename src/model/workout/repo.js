import Workout from "./model.js";

class WorkoutRepository {
  async createOne(workoutData) {
    try {
      const workout = await Workout.create(workoutData);
      return {
        code: 201,
        success: true,
        data: workout,
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
      const workoutsList = await Workout.find();
      return {
        code: 200,
        success: true,
        data: workoutsList,
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
      const workoutsList = await Workout.find()
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        code: 200,
        success: true,
        data: workoutsList,
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
      const workoutsList = await Workout.find(filter);
      return {
        code: 200,
        success: true,
        data: workoutsList,
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

  async getById(workoutId) {
    try {
      const workout = await Workout.findById(workoutId);
      if (!workout) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Workout not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: workout,
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

  async updateById(workoutId, updateData) {
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(
        workoutId,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedWorkout) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Workout not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedWorkout,
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
      const updatedWorkout = await Workout.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedWorkout) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Workout not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedWorkout,
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

  async deleteById(workoutId) {
    try {
      const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
      if (!deletedWorkout) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Workout not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: deletedWorkout,
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

export default new WorkoutRepository();
