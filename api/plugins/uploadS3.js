require('dotenv').config();
const aws = require('aws-sdk');
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const BUCKET = process.env.BUCKET;

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

function upload(file) {
  console.log(AWS_ACCESS_KEY);
  console.log(AWS_SECRET_KEY);
  console.log(BUCKET);
  const s3 = new aws.S3();
  const params = {
    Bucket: BUCKET,
    Key: file.filename,
    Expires: 60,
    ContentType: file.filetype,
    ACL: "public-read"
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
}

module.exports = upload;
