const http = require("node:http");
const fs = require("fs");

// Create a local server to receive data from
// Note the callback runs every time a request comes in
// The request and response object also have various properties with data

const server = http.createServer((req, res) => {
  // Response object is what is used to send a response to the user in the browser

  // Set the path to the local directory start and end it depending on what what is the request
  let path = "./";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    case "/about-me":
      // Redirect from a previous url to a current one
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();

    case "/contact":
      path += "contact-me.html";
      res.statusCode = 200;
      break;

    // Any other route, send default
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // Read HTML file based on its the request path
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end("Server error");
    } else {
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    }
  });
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
