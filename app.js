const http = require('http');
const Koa = require('koa');
const {routes, allowedMethods}  = require('./routes');
const app = new Koa();

const config = {
  app: {
    name: 'cocktail'
  },
  server: {
    port: 3000
  }
};
app.use(routes());
app.use(allowedMethods());

const server = http.createServer(app.callback()).listen(config.server.port, function () {
  console.log('%s listening at port %d', config.app.name, config.server.port);
});

module.exports = {
  closeServer() {
    server.close();
  }
};
