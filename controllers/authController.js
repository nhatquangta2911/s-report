const { User, Role, ExpiredToken, InfoUser } = require("../startup/db");
const ErrorHelper = require("../helpers/ErrorHelper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fileUpload = require("express-fileupload");
const config = require("../config");
const { logger } = require("../middlewares/logging");
const { upload } = require("../helpers/UploadToS3Helper");

const register = async (req, res) => {
  try {
    let isExist = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (isExist) {
      res.status(201).json({ id: isExist.id, status: isExist.status });
    } else {
      let user = await User.create(req.body);
      res.json(user);
    }
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

const register_info = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!user) ErrorHelper.BadRequest(res, "User Not Found.");
    const infoUser = await InfoUser.create(req.body);
    const result = await User.update(
      {
        infoUserId: infoUser.id
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(user);
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      ]
    });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return ErrorHelper.BadRequest(res, "Invalid email or password.");
    if (!user) user = await User.create(req.body);
    const token = jwt.sign(user.toJSON(), config.TOKEN_SECRET_KEY, {
      expiresIn: 18000
    });
    const refreshToken = jwt.sign(
      user.toJSON(),
      config.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: config.REFRESH_TOKEN_LIFE
      }
    );
    const response = {
      token,
      refreshToken,
      user
    };
    res.json(response);
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

const logout = async (req, res) => {
  try {
    let token = req.body.token;
    let success = await ExpiredToken.create({
      token: token
    });
    if (success) {
      res.json(null);
    } else {
      Error.InternalServerError(res, error);
    }
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error);
  }
};

const demoUpload = async (req, res) => {
  try {
    const file = req.files.file;
    if (!file) {
      ErrorHelper.BadRequest(res, "No File Uploaded.");
    } else {
      if (file.size < 5 * 1024 * 1024) {
        upload(res, file, async data => res.json(data));
      } else {
        ErrorHelper.BadRequest(
          res,
          "BIG FILE ERROR: Choose file which is less than 5MB"
        );
      }
    }
  } catch (error) {
    logger.error(error, error.message);
    ErrorHelper.InternalServerError(res, error.message);
  }
};

module.exports = {
  login,
  logout,
  demoUpload,
  register,
  register_info
};
