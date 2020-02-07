const proxy = [
    {
        "/api/*": {
        "target": "https://wprcihml.azurewebsites.net",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true,
        "pathRewrite": {
          "^/wp-json/wp/v2/pages/704": "/Api/footer",
          "^/api": ""
        }
      }
    }
  ];
  module.exports = proxy;