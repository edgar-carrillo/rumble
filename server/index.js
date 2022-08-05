const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const express = require('express');

nextApp.prepare().then(() => {
  const app = express();
  const userRoutes = require('./routes/users');

  // Register Routes
  app.use('/users', userRoutes);

  app.all('*', (req, res) => {
    return handle(req, res)
  });

  const PORT = process.env.SERVER_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Custom server listening on http://localhost:${PORT}`)
  });
});
