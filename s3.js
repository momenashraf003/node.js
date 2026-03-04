require('dotenv').config();
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function checkS3Connection() {
  try {
    // ListBuckets is a simple way to verify credentials and connectivity
    await s3Client.send(new ListBucketsCommand({}));
    console.log('✅ Connected to AWS S3 successfully!');
    return { success: true };
  } catch (error) {
    // We log the error but don't crash the server, as credentials might be added later
    console.error('❌ AWS S3 Connection failed (check your credentials in .env):', error.message);
    return { success: false, error: error.message };
  }
}

checkS3Connection();

module.exports = { s3Client, checkS3Connection };
