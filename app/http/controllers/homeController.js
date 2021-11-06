const Menu = require("../../modals/menu");
function homeController() {
  return {
    async indeex(req, res) {
      const pizzas = await Menu.find();
      console.log(pizzas);
      return res.render("home", { pizzas: pizzas });
    },
  };
}

module.exports = homeController;