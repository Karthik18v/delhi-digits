const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://bittukarthik77:Karthik%407675@cluster0.ztfln.mongodb.net/myDatabase?retryWrites=true&w=majority"; // Ensure database name is included

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo Connection Error"));
db.once("open", () => {
  console.log("Connected to Mongo successfully!");
});

module.exports = db;
 