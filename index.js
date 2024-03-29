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
