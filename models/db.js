// For database login details
require('dotenv').config()
const mongoose = require("mongoose")

console.log(process.env.PORT);

const dbAddress = "mongodb+srv://Webbbbers:NKWKsAYmRdZlz27G@cluster0.p0aj3.mongodb.net/diabetes?retryWrites=true&w=majority";

console.log(dbAddress);


mongoose.connect( dbAddress, {
    useNewUrlParser: true,
    dbName: "diabetes"
  })
  .then(() => console.log('DB connection successful'));

  const db = mongoose.connection

  db.on("error", err => {
      console.error(err);
      process.exit(1)
  })

  db.once("open", async() => {
      console.log("Mongo connection started on " + db.host + ":" + db.port)
  })

  require("./patient")