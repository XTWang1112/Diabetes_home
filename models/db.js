// For database login details
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const DB = process.env.MONGOURL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const db = mongoose.connection;
// If the connection throws an error，catch it and exit.
db.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
// show the connection status
db.once('open', async () => {
  console.log('Mongo connection started on ' + db.host + ':' + db.port);
});

require('./patient');
require('./bloodGlucose');
require('./weight');
require('./insulinTaken');
require('./exercise');
