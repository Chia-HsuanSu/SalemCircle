const { uploadFile } = require('./utilities/googleCloudStorage');

const filePath = 'C:/Users/junio/Downloads/DefaultProfilePic.png'; // Update this path
const destFileName = 'profile-pic/DefaulProfilePic.png'; // Change 'test-folder/test-file.jpg' to your desired destination path in the bucket
const bucketName = 'salem-circle';
uploadFile(filePath, destFileName, bucketName)
  .then(() => console.log('Upload successful'))
  .catch((error) => console.error('Error during upload:', error));
