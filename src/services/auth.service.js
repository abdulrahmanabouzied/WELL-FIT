import jwt from "jsonwebtoken";
import sendMail from "./mailer.service.js";
import fs from "fs";
import mustache from "mustache";
import { decrypt, encrypt } from "./encrypt.service.js";
import parseCookies from "./../utils/getCookies.js";
// getting __dirname value in module type
import path from "path";
import * as url from "url";
import getTime from "../utils/getDate.js";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

/**
 * Generate JWT token
 * @param {Object} payload
 * @param {string | number} duration
 * @returns {Object} response object
 */
const generateToken = (payload, duration) => {
  try {
    console.log(payload, process.env.JWT_SECRET);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS512",
      expiresIn: duration || 60 * 60,
    });
    return {
      code: 201,
      data: token,
      success: true,
    };
  } catch (error) {
    return {
      code: 500,
      error,
      success: false,
    };
  }
};

/**
 * Verify JWT token and return data
 * @param {string} token
 * @returns {Object} data of token
 */
const verifyToken = (token) => {
  try {
    if (!token)
      return {
        code: 404,
        success: false,
        error: { name: "LocaleTokenNotFound", message: "Could not find token" },
      };

    const payload = jwt.verify(token, process.env.jwt_SECRET, {
      algorithms: ["HS512"],
    });

    return {
      code: 200,
      success: true,
      data: payload,
    };
  } catch (error) {
    return {
      code: 401,
      success: false,
      error,
    };
  }
};

/**
 * Send a verification email
 * @param {string} to
 * @param {string} code
 * @returns {Object} results of the process
 */
const verifyEmail = async (to, code) => {
  const text = `Activation Code: ${code}`;
  const html = getTemplate(code);

  if (html.error) {
    return html;
  }
  const result = await sendMail(to, "Email Verification", html, text);
  return result;
};

/**
 * Generate email page
 * @param {number} code - The verification code
 * @returns {Object | string} results or the template to render
 */
function getTemplate(code) {
  try {
    const template = fs
      .readFileSync(path.join(__dirname, "../view/email.html"))
      .toString();
    return mustache.render(template, { code });
  } catch (error) {
    return {
      error: error.message,
      code: 500,
      success: false,
    };
  }
}

/**
 * Authorize user account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Object | null} error description objcet or next triggering
 */

const authenticate = async (req, res, next) => {
  try {
    let access_token = req.session.access_token;
    // let refresh_token = parseCookies(req)["x-refresh-token"];
    let refresh_token = req?.cookies["x-refresh-token"];

    if (!access_token && !refresh_token) {
      return res.status(401).json({
        code: 403,
        success: false,
        error: "Not authorized, Please login and try again!",
      });
    }

    const { error, data } = verifyToken(access_token);
    if (error) {
      if (
        error.name == "TokenExpiredError" ||
        error.name == "LocaleTokenNotFound"
      ) {
        refresh_token = JSON.parse(decrypt(refresh_token));
        const { error, data: vdata } = verifyToken(refresh_token);

        if (error) {
          return res.status(403).json({
            success: false,
            code: 403,
            error: error.message,
            message: "Please login again.",
          });
        }

        const new_access_token = generateToken(
          { email: vdata.email, _id: vdata._id, active: vdata.active },
          60 * 15
        );
        const new_refresh_token = generateToken(
          { email: vdata.email, _id: vdata._id, active: vdata.active },
          "3d"
        );

        if (new_access_token?.error || new_refresh_token?.error) {
          const tres = new_access_token.error
            ? new_access_token.error
            : new_refresh_token.error;
          return res.status(500).json(tres);
        }

        req.session.access_token = new_access_token.data;

        res.cookie(
          "x-refresh-token",
          encrypt(JSON.stringify(new_refresh_token.data)),
          {
            httpOnly: true,
            maxAge: getTime("3d"),
            secure: false,
            sameSite: "strict",
          }
        );

        await req.session.save();
        req.client = data;
        req.new_refresh_token = encrypt(JSON.stringify(new_refresh_token.data));
        next();
      } else
        return res.status(403).json({
          code: 403,
          success: false,
          error,
        });
    } else {
      req.client = data;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      success: false,
      error: error.message,
      trace: error,
    });
  }
};

export default authenticate;
export { verifyEmail, verifyToken, generateToken };
