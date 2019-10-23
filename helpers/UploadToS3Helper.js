const AWS = require('aws-sdk');
const config = require('../config');
const Busboy = require('busboy');
const ErrorHelper = require('../helpers/ErrorHelper');
const { logger } = require('../middlewares/logging');

module.exports = {
  upload: (file, callback) => {
    let s3bucket = new AWS.S3({
      accessKeyId: config.S3_ACCESS_KEY_ID,
      secretAccessKey: config.S3_SECRET_ACCESS_KEY
    });
    var params = {
      Bucket: 's-report',
      Key: Date.now() + '' + Math.floor(Math.random() * 100000 + 1) + file.name,
      Body: file.data
    };
    s3bucket.upload(params, (error, data) => {
      if (error) {
        logger.error(error);
      }
      logger.error(data);
      callback(data.Location);
    });
  }
};
