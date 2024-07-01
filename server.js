const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect("mongodb://localhost/BlogPostDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
