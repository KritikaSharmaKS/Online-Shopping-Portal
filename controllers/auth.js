const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "SG.elbZGHuUQHq4fNesbQe8Kw.gAGgouuRx_QvwmLUsJN-P5Xeh_gMgx4Lo4hoNPIvHuM",
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid password");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          req.flash("error", "Invalid email or password");
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "E-Mail already exists");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: "kritikasharma462@gmail.com",
            subject: "Let's Get Shopping",
            html: "<h1>You Successfully Signed Up</h1>",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};

exports.getReset = (req, res, next) => {
    let message = req.flash("error");
    if (message.length) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("auth/reset", {
        pageTitle: "Reset Password",
        path: "/reset",
        errorMessage: message
    });
};