const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/chit-chat",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  );
  console.log("Mongo connected");
}

main();