const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api/", "/l/", "/f/", "/t/"], {
      target: "http://localhost:8080"
    })
  );
};
