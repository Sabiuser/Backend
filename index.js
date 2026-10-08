const app = require("./app");
const DB = require("./database")
require("dotenv").config()

DB()
app.listen(5000, () => {
  console.log("run!!");
});
