const authCntroller = require("../app/http/controllers/authControllers");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");

const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin");

function initRoutes(app) {
  app.get("/", homeController().indeex);

  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  app.get("/login", guest, authCntroller().login);
  app.post("/login", authCntroller().postLogin);

  app.get("/register", guest, authCntroller().register);
  app.post("/register", authCntroller().postRegister);
  app.post('/logout', authCntroller().postLogout);

  app.post("/orders", auth, orderController().store);
  app.get("/customer/orders", auth, orderController().index);
  app.get("/customer/orders/:id", auth, orderController().show);

  app.get("/admin/orders", admin, adminOrderController().index);
  app.post("/admin/order/status", admin, statusController().update);
}

module.exports = initRoutes;
