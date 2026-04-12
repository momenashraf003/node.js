const { checkConnection } = require('./db');
const { checkS3Connection } = require('./s3');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  console.log("server logs running and .env variables should be loaded");
  console.log("ci/cd working successfully");
  res.json({ message: 'Hello, your API is working!' });
});

app.get('/test-connections', async (req, res) => {
  const dbStatus = await checkConnection();
  const s3Status = await checkS3Connection();
  console.log("Database Connection Status:", dbStatus);
  console.log("S3 Connection Status:", s3Status);
  console.log("ci/cd working successfully");

  res.json({
    message: "Connection Status v209",
    mysql: dbStatus.success ? 'Connected' : `Failed: ${dbStatus.error}`,
    s3: s3Status.success ? 'Connected' : `Failed: ${s3Status.error}`
  });
});

app.listen(PORT, () => {
  console.log("Docker running")
  console.log(`Server is running`);
});
