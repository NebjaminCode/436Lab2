const mongoose = require("mongoose");
const uri = process.env.DB_URI;

function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database conection established.");
    },
    (err) => {
      console.log("Error b/c of: ", err);
    }
  );
}
module.exports = connect;
