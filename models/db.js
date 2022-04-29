// For database login details
require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.PORT);

// Connect to the MongoDB
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    dbName: "diabetes",
  })
  .then(() => console.log("DB connection successful"));

const db = mongoose.connection;
// If the connection throws an error，catch it and exit.
db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
// show the connection status
db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" + db.port);
});

require("./patient");
require("./bloodGlucose");
require("./weight");
require("./insulinTaken");
require("./exercise");
