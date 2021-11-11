let ejs = require("ejs");

const Menu = require("../../modals/menu");
function homeController() {
  return {
    async indeex(req, res) {
      const pizzas = await Menu.find();
      var categories = ["type"];
      return res.render("home", { pizzas: pizzas, categories: categories });
    },
  };
}

module.exports = homeController;