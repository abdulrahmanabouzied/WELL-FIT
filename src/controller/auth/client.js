import ClientRepository from "../../model/client/repo.js";
import { verifyEmail, generateToken } from "../../services/auth.service.js";
import { encrypt } from "../../services/encrypt.service.js";
import bcrypt from "bcrypt";
import getTime from "./../../utils/getDate.js";

class ClientAuthController {
  /**
   * Create a new client.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async registerClient(req, res, next) {
    const clientData = req.body;

    const result = await ClientRepository.createOne(clientData);

    if (result.data) {
      req.session.client = result.data;
      // const code = crypto.randomInt(1000, 10000); // min: 1000, max: 10000
      const code = Math.floor(Math.random() * 9000) + 1000;
      req.session.code = code;
      await req.session.save();
      // let verified = {};
      let verified = await verifyEmail(result.data.email, code);
      // if (true) {
      if (verified?.data) {
        console.log(result);
        res
          .status(result.code)
          .json({ ...result, verified: verified?.data, code });
      } else res.status(verified?.code).json(verified);
    } else res.status(result.code).json(result);
  }

  /**
   * Sign in a user
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async signIn(req, res, next) {
    const { email, password } = req.body;
    const result = await ClientRepository.getOne({ email });

    if (!result.data) {
      return res.status(403).json({ ...result, message: "Invalid Email!" });
    }

    if (!result.data?.active) {
      res.status(401).json({
        success: false,
        error: "Client account not active.",
        code: 401,
      });
    }

    const signed = await bcrypt.compare(password, result?.data?.password);

    console.log(`New Login to the System: ${email}`);

    if (signed) {
      const { email, _id, active } = result.data;
      const access_token = generateToken({ email, _id, active }, 60 * 15);
      let refresh_token = generateToken({ email, _id, active }, "3d");

      console.log(`Token generated: access:${access_token.data}`);
      console.log(`Token generated: refresh:${refresh_token.data}`);

      req.session.client = result.data;
      req.session.access_token = access_token.data;
      await req.session.save();
      refresh_token = encrypt(JSON.stringify(refresh_token.data));

      if (refresh_token.data)
        res.cookie("x-refresh-token", refresh_token, {
          httpOnly: true,
          maxAge: getTime("3d"),
          secure: false,
          sameSite: "strict",
        });

      return res
        .status(result.code)
        .json({ ...result, access_token, refresh_token });
    }
    return res.status(401).json({ ...result, message: "Invalid Password!" });
  }

  /**
   * Verify user Email
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async verifyEmail(req, res, next) {
    const { code } = req.query;

    if (code == req.session.code) {
      const id = req.session.client._id;
      const result = await ClientRepository.updateById(id, {
        active: true,
      });

      if (result.data) {
        await req.session.destroy();
        res.status(result.code).json(result);
      } else res.status(result.code).json(result);
    } else {
      res.status(401).json({
        code: 401,
        error: "Invalid code",
        success: false,
      });
    }
  }
}

export default new ClientAuthController();
