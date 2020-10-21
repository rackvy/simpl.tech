const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const User = require("../models").User;
const Shop = require("../models").Shop;
const Tarif = require("../models").Tarif;
const Category = require("../models").Category;
const Catalog = require("../models").Catalog;
const Banner = require("../models").Banner;
const Basket = require("../models").Basket;
const Order = require("../models").Order;

router.get("/", (req, res) => {
  res.render("index", {
    title: "Simple platform | Создай свой интернет магазин за 15 минут page",
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title:
      "О компании и платформе Simple platform | Создай свой интернет магазин за 15 минут page",
  });
});

router.get("/price", (req, res) => {
  res.render("price", {
    title:
      "Цены Simple platform | Создай свой интернет магазин за 15 минут page",
  });
});

router.get("/contacts", (req, res) => {
  res.render("contacts", {
    title:
      "Связаться с Simple platform | Создай свой интернет магазин за 15 минут page",
  });
});

router.get("/use", (req, res) => {
  res.render("use", {
    title:
      "Кому пригодится и как использовать | Simple platform Создай свой интернет магазин за 15 минут page",
  });
});

router.get("/login", (req, res) => {
  res.redirect("/auth/login");
});

router.get("/register", (req, res) => {
  res.redirect("/auth/register");
});

router.get("/register", (req, res) => {
  res.redirect("/auth/register");
});

// ROUTER SHOPS

router.get("/:code", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }

  const banners = await Banner.findAll({ where: { user_id: shop.user_id } });
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });
  const catalog = await Catalog.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
    limit: 50,
  });
  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });

  res.render("shop/main", {
    layout: "shop",
    shop,
    banners,
    catogorys,
    catalog,
    countBasket,
    ssid: req.sessionID,
  });
});

router.get("/:code/catalog", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  const banners = await Banner.findAll({ where: { user_id: shop.user_id } });
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });
  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });

  res.render("shop/catalog", {
    layout: "shop",
    shop,
    banners,
    catogorys,
    countBasket,
  });
});

router.get("/:code/catalog/section", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  res.redirect("/" + shopcode + "/catalog");
});

router.get("/:code/catalog/section/:id", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  const idCat = req.params.id;
  const catalog = await Catalog.findAll({
    where: { user_id: shop.user_id, cat_id: idCat },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
    limit: 50,
  });
  const catogory = await Category.findOne({
    where: { id: idCat, user_id: shop.user_id },
  });
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });
  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });

  res.render("shop/catalog-section", {
    layout: "shop",
    shop,
    catogory,
    catalog,
    title: catogory.name,
    catogorys,
    countBasket,
  });
});

router.get("/:code/catalog-detail/", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  res.redirect("/" + shopcode + "/catalog");
});

router.get("/:code/catalog-detail/:id", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }

  const item_id = req.params.id;
  const item = await Catalog.findOne({
    where: { user_id: shop.user_id, id: item_id },
  });
  const catogory = await Category.findOne({
    where: { id: item.cat_id, user_id: shop.user_id },
  });
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });
  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });

  res.render("shop/catalog-item", {
    layout: "shop",
    shop,
    catogory,
    item,
    title: item.name,
    catogorys,
    countBasket,
  });
});

router.get("/:code/contacts/", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  const shops = JSON.parse(shop.adresses);
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });
  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });

  res.render("shop/contacts", {
    layout: "shop",
    shop,
    shops,
    title: "Контакты " + shop.name,
    catogorys,
    countBasket,
  });
});

router.get("/:code/payment_delivery/", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  const texts = JSON.parse(shop.texts);
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });
  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });

  res.render("shop/payment_delivery", {
    layout: "shop",
    shop,
    texts,
    title: "Оплата и доставка",
    catogorys,
    countBasket,
  });
});

router.get("/:code/basket/", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }

  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });
  const basket = await Basket.findAll({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });
  var ids = [],
    summPrice = 0;

  basket.forEach((item) => {
    ids.push(item.item_id);
    summPrice = summPrice + item.price * item.count;
  });

  const catalog = await Catalog.findAll({ where: { id: ids } });
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });

  res.render("shop/basket", {
    layout: "shop",
    shop,
    title: "Корзина",
    basket,
    countBasket,
    catalog,
    summPrice,
    catogorys,
  });
});

router.get("/:code/new-order/", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }

  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });
  if (countBasket == 0) {
    return res.redirect("/" + shop.url + "/catalog/");
  }
  const basket = await Basket.findAll({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });
  var ids = [],
    summPrice = 0;

  basket.forEach((item) => {
    ids.push(item.item_id);
    summPrice = summPrice + item.price * item.count;
  });

  const catalog = await Catalog.findAll({ where: { id: ids } });
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });

  res.render("shop/new-order", {
    layout: "shop",
    shop,
    title: "Оформление заказа",
    basket,
    countBasket,
    catalog,
    summPrice,
    catogorys,
  });
});

router.get("/:code/delete_basket/:id", async (req, res) => {
  const id = req.params.id;
  Basket.destroy({
    where: {
      id: id,
      ssid: req.sessionID,
    },
  }).then((err) => {});
  res.redirect("/" + req.params.code + "/basket");
});

router.get("/:code/success/", async (req, res) => {
  const shopcode = req.params.code;
  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }

  const countBasket = await Basket.count({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });
  const catogorys = await Category.findAll({
    where: { user_id: shop.user_id },
    order: [
      ["id", "ASC"],
      ["name", "ASC"],
    ],
  });

  res.render("shop/success", {
    layout: "shop",
    shop,
    title: "Заказ успешно оформлен",
    countBasket,
    catogorys,
    id: req.query.id,
  });
});

router.post("/:code/add_to_basket", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }

  const { item_id, name, price } = req.body;
  const haveInBasket = await Basket.findOne({
    where: { shop_id: shop.id, ssid: req.sessionID, item_id: item_id },
  });

  if (haveInBasket === null) {
    const newItenOnBasket = new Basket({
      ssid: req.sessionID,
      shop_id: shop.id,
      item_id: item_id,
      name: name,
      price: price,
      count: 1,
    });
    await newItenOnBasket.save();
  } else {
    const result = await Basket.update(
      {
        count: haveInBasket.count + 1,
      },
      { where: { id: haveInBasket.id } }
    );
  }
});

router.post("/:code/basket/count_item", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  const { id, count } = req.body;
  console.log(req.body);
  const result = await Basket.update(
    {
      count: count,
    },
    { where: { id: id } }
  );
  console.log(result);
});

router.post("/:code/catalog-detail/:id", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }

  const { item_id, name, price } = req.body;
  if (req.body.prop != null) {
    var prop = req.body.prop;
  } else {
    var prop = {};
  }
  const haveInBasket = await Basket.findOne({
    where: {
      shop_id: shop.id,
      ssid: req.sessionID,
      item_id: item_id,
      properties: prop,
    },
  });

  if (haveInBasket === null) {
    const newItenOnBasket = new Basket({
      ssid: req.sessionID,
      shop_id: shop.id,
      item_id: item_id,
      name: name,
      price: price,
      count: 1,
      properties: prop,
    });
    await newItenOnBasket.save();
  } else {
    const result = await Basket.update(
      {
        count: haveInBasket.count + 1,
      },
      { where: { id: haveInBasket.id } }
    );
  }
  res.redirect("/" + shopcode + "/catalog-detail/" + item_id);
});

router.post("/:code/new-order/", async (req, res) => {
  const shopcode = req.params.code;

  const shop = await Shop.findOne({ where: { url: shopcode } });
  if (shop == null) {
    return res.status(404).render("404", {
      title: "Страница не найдена",
    });
  }
  const { name, email, phone, pay, delivery, adress, comment } = req.body;
  const basket = await Basket.findAll({
    where: { shop_id: shop.id, ssid: req.sessionID },
  });
  var ids = [],
    summ = 0;
  basket.forEach((item) => {
    ids.push(item.id);
    summ = Number(summ) + Number(item.price * item.count);
  });

  var items = {
    status: "new",
    summ: summ,
    basket: basket,
  };

  if (basket != null) {
    const newOrder = new Order({
      shop_id: shop.id,
      name: name,
      email: email,
      phone: phone,
      pay: pay,
      delivery: delivery,
      adress: adress,
      comment: comment,
      items: items,
    });
    await newOrder.save();

    //console.log(newOrder);

    Basket.destroy({
      where: {
        id: ids,
        ssid: req.sessionID,
      },
    }).then((err) => {});

    res.redirect("/" + shop.url + "/success/?id=" + newOrder.id);
  }
});

module.exports = router;
