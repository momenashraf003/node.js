const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  console.log("server logs running")
  res.json({ message: 'Hello, your API is working!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
