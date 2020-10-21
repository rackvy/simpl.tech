require("dotenv").config();
const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const User = require("../models").User;

function isValidPassword(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

router.get("/", async (req, res) => {
  res.redirect("/auth/login/");
});

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title:
      "Авторизация | Simple platform Создай свой интернет магазин за 15 минут page",
  });
});

router.get("/register", async (req, res) => {
  res.render("auth/register", {
    title:
      "Регистрация | Simple platform Создай свой интернет магазин за 15 минут page",
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

router.post("/register", async function (req, res) {
  if (!isValidPassword(req.body.password)) {
    return res.render("auth/register", {
      title:
        "Регистрация | Simple platform Создай свой интернет магазин за 15 минут page",
      error: true,
      message: "Пароль должен быть минимум из 8 символов.",
    });
  }
  if (!isValidEmail(req.body.email)) {
    return res.render("auth/register", {
      title:
        "Регистрация | Simple platform Создай свой интернет магазин за 15 минут page",
      error: true,
      message: "Email адрес введен не корректно.",
    });
  }
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const candidate = await User.findOne({ where: { email: email }, raw: true });
  if (candidate === null) {
    const salt = process.env.DB_SECRET;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email.toLowerCase(),
      role: "user",
      password: hashPassword,
      salt: salt,
      tarif_id: 1,
    });
    await user.save();
    req.session.isAuth = true;
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) throw err;
      res.redirect("/panel");
    });
  } else {
    return res.render("auth/register", {
      title:
        "Регистрация | Simple platform Создай свой интернет магазин за 15 минут page",
      error: true,
      message: "Email адрес уже существует.",
    });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const candidate = await User.findOne({ where: { email: email }, raw: true });

  if (candidate === null) {
    console.log("User is null");
    return res.render("auth/login", {
      title:
        "Авторизация | Simple platform Создай свой интернет магазин за 15 минут page",
      error: true,
      message:
        "Такой пользователь не найден. Проверьте данные, которые вводите.",
    });
  } else {
    const areSame = await bcrypt.compare(password, candidate["password"]);
    if (areSame) {
      await User.update(
        { last_login: Date.now() },
        { where: { id: candidate["id"] } }
      );
      req.session.userId = candidate["id"];
      req.session.isAuth = true;
      req.session.save((err) => {
        if (err) throw err;
        res.redirect("/panel");
      });
    } else {
      return res.render("auth/login", {
        title:
          "Авторизация | Simple platform Создай свой интернет магазин за 15 минут page",
        error: true,
        message: "Ошибка. Неверный пароль.",
      });
    }
  }
});

module.exports = router;
