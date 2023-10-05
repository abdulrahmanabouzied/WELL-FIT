import { encrypt } from "../../services/encrypt.service.js";
import CoachRepository from "../../model/coach/repo.js";
import genHash from "../../utils/genHash.js";
import {
  verifyEmail as Verify,
  generateToken,
} from "../../services/auth.service.js";
import * as bcrypt from "bcrypt";
import getTime from "../../utils/getDate.js";
class ClientAuthController {
  /**
   * Register a new coach.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async registerCoach(req, res) {
    const coachData = req.body;
    const result = await CoachRepository.createOne(coachData);
    res.status(result.code).json(result);
  }

  /**
   * Sign in a Coach to the system
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async signIn(req, res) {
    const { email, password } = req.body;
    const result = await CoachRepository.getOne({ email });

    if (!result.data) {
      return res.status(result.code).json(result);
    }

    const signed = await bcrypt.compare(password, result.data.password);

    if (signed) {
      const { email, _id } = result.data;
      const access_token = generateToken({ email, _id }, 60 * 15);
      const refresh_token = generateToken({ email, _id }, "3d");

      req.session.client = result.data;
      req.session.access_token = access_token.data;
      await req.session.save();

      res.cookie(
        "x-refresh-token",
        encrypt(JSON.stringify(refresh_token.data)),
        {
          httpOnly: true,
          maxAge: getTime("3d"),
          secure: false,
          sameSite: "strict",
        }
      );
      return res.status(result.code).json({
        code: result.code,
        success: result.success,
        data: {
          _id: result.data._id,
          username: result.data.username,
          clients: result.data.clients,
          upComingMeetings: result.data.upComingMeetings,
        },
      });
    } else
      return res.status(401).json({
        code: 401,
        success: false,
        error: "not authorized",
      });
  }

  /**
   * generate hashed password
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async getPass(req, res) {
    const { password } = req.query;
    let hash = await genHash(password);
    res.status(201).json({
      code: 201,
      success: true,
      data: hash,
    });
  }

  /**
   * Verify user Email
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async verifyEmailCode(req, res) {
    const { code } = req.query;
    const { client } = req.session;
    if (code == req.session.code) {
      const { email, _id } = client;
      const access_token = generateToken({ email, _id }, 60 * 15);
      const refresh_token = generateToken({ email, _id }, "3d");

      console.log(client);
      req.session.access_token = access_token.data;
      req.session.code = undefined;
      await req.session.save();

      res.cookie(
        "x-refresh-token",
        encrypt(JSON.stringify(refresh_token.data)),
        {
          httpOnly: true,
          maxAge: getTime("3d"),
          secure: false,
          sameSite: "strict",
        }
      );

      res.status(200).json({
        code: 200,
        success: true,
        data: "Email verified",
      });
    } else {
      res.status(401).json({
        code: 401,
        error: "Invalid code",
        success: false,
      });
    }
  }

  /**
   * verify email to update password
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  async forgotPassword(req, res) {
    const { email } = req.body;

    const result = await CoachRepository.getOne({ email });

    if (!result.data) {
      res.status(result.code).json(result);
    }

    const code = Math.floor(Math.random() * 9000) + 1000;
    req.session.client = result.data;
    req.session.code = code;
    await req.session.save();
    const verified = await Verify(email, code);

    if (!verified.data) {
      res.status(verified.code).json(verified);
    }

    res.status(verified.code).json(verified);
  }
}
export default new ClientAuthController();
