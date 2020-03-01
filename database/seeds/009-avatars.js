const fs = require("fs");
const path = require("path");

const AWS = require('aws-sdk');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS
});

const s3 = new AWS.S3();

const params = {
  Bucket: process.env.AWS_S3_BUCKET, /* required */
  Delimiter: '/',
  Prefix: 'avatars/'  // Can be your folder name
}

exports.seed = async function(knex) {
  const avatars = [];
  let promise = new Promise((resolve, reject) => {
    s3.listObjectsV2(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        data.Contents.forEach((avatar) => {
          avatars.push({ src: `${avatar.Key}` });
        })
      }
      resolve()
    });
  })

  await promise;
  //Insert avatars into db
  return knex("avatars").insert(avatars);
};
