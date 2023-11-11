import Coach from "./model.js";

class CoachRepository {
  async createOne(coachData) {
    try {
      const coach = await Coach.create(coachData);

      if (!coach) {
        throw new Error("Coach could not be created.");
      }

      return {
        code: 201,
        success: true,
        data: coach,
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
      const coaches = await Coach.find(
        {},
        {
          username: 1,
          clients: 1,
          upComingMeetings: 1,
        }
      ).lean();
      return {
        code: 200,
        success: true,
        data: coaches,
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
      const coaches = await Coach.find(
        {},
        {
          email: 1,
          username: 1,
          clients: 1,
          upComingMeetings: 1,
        }
      )
        .populate("upComingMeetings")
        .populate("clients")
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        code: 200,
        success: true,
        data: coaches,
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
      const coach = await Coach.findOne(filter)
        .populate("clients")
        .populate("upComingMeetings")
        .lean();

      if (!coach) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Coach not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: coach,
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

  async getClientsMeetings(coachId) {
    try {
      const coach = await Coach.findById(coachId, "-password")
        .populate("clients")
        .populate({
          path: "clients",
          populate: {
            path: "upComingMeeting",
            model: "Meetings",
          },
        })
        .lean();

      if (!coach) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Coach not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: coach,
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

  async getById(coachId) {
    try {
      const coach = await Coach.findById(coachId, "-password")
        .populate("upComingMeetings")
        .populate("clients")
        .lean();

      if (!coach) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Coach not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: coach,
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

  async updateById(coachId, updateData) {
    try {
      const updatedCoach = await Coach.findByIdAndUpdate(coachId, updateData, {
        new: true,
      }).lean();
      if (!updatedCoach) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Coach not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedCoach,
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
      const updatedCoach = await Coach.findOneAndUpdate(filter, updateData, {
        new: true,
      }).lean();
      if (!updatedCoach) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Coach not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedCoach,
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

  async deleteById(coachId) {
    try {
      const deletedCoach = await Coach.findByIdAndDelete(coachId);
      if (!deletedCoach) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Coach not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: deletedCoach,
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

export default new CoachRepository();
