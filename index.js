"use strict";

import { createServer } from "http";
import Tailor from "node-tailor";
const tailor = new Tailor({
  templatesPath: __dirname + "/templates"
});

createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    return res.end("");
  }

  req.headers["x-request-uri"] = req.url;
  req.url = "/index";

  tailor.requestHandler(req, res);
}).listen(8080, function() {
  console.log("Tailor server listening on port 8080");
});

createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
  res.end("<div>Fragment 1</div>");
}).listen(8081, function() {
  console.log("Fragment Server listening on port 8081");
});
