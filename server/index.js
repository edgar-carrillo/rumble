const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const express = require('express');

nextApp.prepare().then(() => {
  const app = express();
  const userRoutes = require('./routes/users');
  const photoRoutes = require('./routes/photoRoutes');

  // Register Routes with custom body constraints
  app.use('/photos', photoRoutes);

  // Application middleware
  app.use(express.json());

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
