// For database login details
require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.PORT);

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    dbName: "diabetes",
  })
  .then(() => console.log("DB connection successful"));

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" + db.port);
});

require("./patient");
require("./bloodGlucose");
require("./weight");
require("./insulinTaken");
require("./exercise");
