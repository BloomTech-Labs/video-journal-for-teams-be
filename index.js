require('dotenv').config();

const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});


//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
