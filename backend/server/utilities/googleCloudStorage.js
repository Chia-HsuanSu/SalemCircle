const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Initialize Google Cloud Storage client
const storage = new Storage();

/**
 * Uploads a file to Google Cloud Storage.
 * @param {string} filePath - The local path to the file.
 * @param {string} destFileName - The destination filename in the bucket.
 * @param {string} bucketName - The name of the Google Cloud Storage bucket.
 * @returns {Promise<string>} The public URL of the uploaded file.
 */
async function uploadFile(filePath, destFileName, bucketName = 'salem-circle') {
  try {
    await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
     
    });
    console.log(`${filePath} uploaded to ${bucketName}`); 

    return `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(destFileName)}`;
  } catch (error) {
    console.error('Error uploading file to Google Cloud Storage:', error);
    throw error; 
  }
}

module.exports = { uploadFile };