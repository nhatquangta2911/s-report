const { User, Role, ExpiredToken } = require('../startup/db');
const ErrorHelper = require('../helpers/ErrorHelper');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { logger } = require('../middlewares/logging');

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [
        {
          model: Role,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    });
    if (!user) user = await User.create(req.body);
    const token = jwt.sign(user.toJSON(), config.TOKEN_SECRET_KEY, {
      expiresIn: config.TOKEN_LIFE
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

module.exports = {
  login,
  logout
};
