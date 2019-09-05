const video = require('./routes/video');

module.exports = (app) => {
  app.get('/', (req, res) => {
    // global.config
    res.json({ working: true });
  });
  video(app);
};
