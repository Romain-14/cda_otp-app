import app from './app.js';

const PORT = process.env.LOCAL_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});