const Router = require('koa-router');
const {ServiceFactory} = require('../src/application/api/serviceFactory');
const {CocktailController} = require('../src/application/api/controllers/cocktailController');

const router = new Router();

const routes = function routes(ctx, next) {
  const serviceFactory = new ServiceFactory();
  const cocktailController = new CocktailController(serviceFactory);
  router
      .get('/dingdong', cocktailController.getAvailable.bind(cocktailController));
  return router.routes()
}


module.exports = {
  routes () { return routes() },
  allowedMethods () { return router.allowedMethods() }
};
