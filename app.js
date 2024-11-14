const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/about", (req, res) =>
  res.sendFile(path.join(__dirname, "about.html"))
);
app.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirname, "contact-me.html"))
);
// 404 handler middleware (should be defined last)
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
