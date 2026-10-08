const jwt = require("jsonwebtoken");
const refreshToken = (user) => {
  return jwt.sign(
    {
      userName: user?.name,
      id: user?.id,
      role: user?.role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "10d",
    }
  );
};
module.exports={
     refreshToken
}