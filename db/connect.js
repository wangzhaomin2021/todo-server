const mongoose = require("mongoose");

const handleError = (error) => console.error(error);
const { DB_NAME } = process.env;

// mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)
mongoose
  .connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)
  .then(() => {
    console.log("数据库连接成功...");
  })
  .catch((error) => handleError(error));
