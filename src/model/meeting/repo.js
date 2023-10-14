import Meeting from "./model.js";
import Coach from "../coach/model.js";
import Client from "../client/model.js";

class MeetingRepository {
  /**
   *  createOne - create a new Meeting
   * @param {Object} meetingData {coach, client, url, date}
   * @param {String} client - client id
   * @param {String} coach - coach id
   * @returns {Promise<Object>} Object with results
   * @description expected appending it to related coach and client
   */
  async createOne(meetingData, client, coach) {
    try {
      const meeting = await Meeting.create(meetingData);
      let addedToCoach = await Coach.findByIdAndUpdate(coach, {
        $push: {
          upComingMeetings: meeting._id,
        },
      });
      let addedToClient = await Client.findByIdAndUpdate(client, {
        upComingMeeting: meeting._id,
      });

      return {
        code: 201,
        success: true,
        data: meeting,
        error: null,
      };
    } catch (error) {
      console.log(error.stack);
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
      const meetingsList = await Meeting.find().lean();
      return {
        code: 200,
        success: true,
        data: meetingsList,
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
      const meetingsList = await Meeting.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return {
        code: 200,
        success: true,
        data: meetingsList,
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
      const meetingsList = await Meeting.find(filter)
        .populate("coach client")
        .lean();
      return {
        code: 200,
        success: true,
        data: meetingsList,
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

  async getById(meetingId) {
    try {
      const meeting = await Meeting.findById(meetingId)
        .populate("client coach")
        .lean();
      if (!meeting) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meeting not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: meeting,
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
   * update Meering
   * @param {String} meetingId
   * @param {Object} updateData
   * @returns {Object}
   */
  async updateById(meetingId, updateData) {
    try {
      const updatedMeeting = await Meeting.findByIdAndUpdate(
        meetingId,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedMeeting) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meeting not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedMeeting,
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
      const updatedMeeting = await Meeting.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
        }
      );
      if (!updatedMeeting) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meeting not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: updatedMeeting,
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

  async deleteById(meetingId) {
    try {
      const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);
      if (!deletedMeeting) {
        return {
          code: 404,
          success: false,
          data: null,
          error: "Meeting not found",
        };
      }
      return {
        code: 200,
        success: true,
        data: deletedMeeting,
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

export default new MeetingRepository();
