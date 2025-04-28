const { getDBConnection } = require('../helpers/connectDb');

const connectDB = async (req, res, next) => {
  try {
    const project = req.query.project;
    if (!project) {
      return res.status(400).json({ message: 'Missing project query parameter' });
    }

    req.db = await getDBConnection(project, process.env.MONGO_URL);
    next();
  } catch (err) {
    return res.status(500).json({ message: 'DB connection error', error: err.message });
  }
};
module.exports = connectDB;