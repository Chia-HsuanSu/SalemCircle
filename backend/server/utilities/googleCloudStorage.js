const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Initialize Google Cloud Storage client
const storage = new Storage();

/**
 * Uploads a file to Google Cloud Storage.
 * @param {string} filePath - The local path to the file.
 * @param {string} destFileName - The destination filename in the bucket.
 * @param {string} bucketName - The name of the Google Cloud Storage bucket.
 */
async function uploadFile(filePath, destFileName, bucketName = 'salem-circle') {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}

module.exports = { uploadFile };