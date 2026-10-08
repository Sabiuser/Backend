const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const authToken = token.split(" ")[1];

  jwt.verify(authToken, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Token has expired!" });
    }

    req.Userdata = data;
    next();
  });
};
const permit = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.Userdata || {};
    if (!role || !allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You dont have access!!!" });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  permit,
};
