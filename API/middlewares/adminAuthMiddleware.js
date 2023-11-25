const User = require('../models/users_model');

const adminAuthMiddleware = async (req, res, next) => {
  const user = req.user;

  if (user) {
    try {
      // Fetch the user from the database to ensure the latest data
    const dbUser = await User.findOne({ level: "admin" });

      if (dbUser && dbUser.level === 'admin') {
        next();
      } else {
        return res.status(403).json({ error: 'Unauthorized - Admin access required' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(403).json({ error: 'Unauthorized - Admin access required' });
  }
};

module.exports = adminAuthMiddleware;
