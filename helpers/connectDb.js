const mongoose = require('mongoose');

const path = require('path');
const fs = require('fs');

const connections = {};

 const getDBConnection = async (project, MONGO_URL) => {
  if (!connections[project]) {
    const conn = await mongoose.createConnection(
      `${MONGO_URL}${project}?retryWrites=true&w=majority`);

    const modelPath = path.join(__dirname, '../models');
    if (fs.existsSync(modelPath)) {
      fs.readdirSync(modelPath).forEach((file) => {
        if (file.endsWith('.js')) {
          const model = require(path.join(modelPath, file));
          if (typeof model === 'function') {
            model(conn);
          }
        }
      });
    }

    connections[project] = conn;
  }

  return connections[project];
};
module.exports = { getDBConnection };
