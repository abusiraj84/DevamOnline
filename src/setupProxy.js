const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/wp-json", {
      target: "https://devam.website",
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    proxy("/api/breeds", {
      target: "https://dog.ceo",
      secure: false,
      changeOrigin: true,
    })
  );
};
