const jwt = require("jsonwebtoken");
const normalToken = (user) => {
  return jwt.sign(
    {
      userName: user?.name,
      id: user?.id,
      role : user?.role
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1m",
    }
  );
};

module.exports={
    normalToken
}