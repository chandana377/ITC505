const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger('dev'));

// Serve static files
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// Route to generate Mad Lib story
server.post('/ITC505/lab-7/madlib', (req, res) => {
  const { adjective, pluralNoun, verb, place, animal } = req.body;

  // Validate all fields
  if (!adjective || !pluralNoun || !verb || !place || !animal) {
    return res.json({
      success: false,
      message: 'Please fill out all fields before submitting.'
    });
  }

  // Build story dynamically
  const story = `
    One sunny morning in ${place}, a group of ${adjective} ${pluralNoun}
    decided to ${verb} with a mischievous ${animal}.
    Everyone laughed so hard that even the ${animal} started dancing!
    It was truly a ${adjective} day to remember.
  `;

  res.json({
    success: true,
    story: story.trim()
  });
});

// Server setup
let port = 80;
if (process.argv[2] === 'local') port = 8080;

server.listen(port, () => console.log(`✅ Server running on port ${port}`));
