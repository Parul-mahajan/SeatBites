const Order = require("../../../modals/order");
const moment = require('moment')
function orderController() {
  return {
    store(req, res) {
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "all fields required");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address,
      });
      order
        .save()
        .then((result) => {
          req.flash("success", "order placed sucessfully");
          delete req.session.cart;
          //emit
          Order.populate(result, { path: 'customerId', select: '-password' }, (err, placedOrder) => {
            const eventEmitter = req.app.get('eventEmitter');
            eventEmitter.emit('orderPlaced', result);
          return res.redirect("customer/orders");
          });
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          delete req.session.cart;
          return res.redirect("/cart");
        })
    },
    async index(req, res) {
      if (req.user.role === 'admin')
        return res.redirect('/admin/orders')
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header("Cache-Control", "no-store");
      res.render("customers/orders", { orders: orders, moment: moment });
    },
    async show(req, res) {
      const order = await Order.findById(req.params.id);
      // Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", { order: order});
      }
      return res.redirect("/");
    }
  }
}

module.exports = orderController;
