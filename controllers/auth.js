const bcrypt = require("bcryptjs");

const User = require("../models/user");

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
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
        if (!user) {
            req.flash('error', "Invalid email or password");
            return res.redirect('/login');
        }
        bcrypt
            .compare(password, user.password)
            .then(doMatch => {
                if(doMatch){
                    req.session.user = user;
                    req.session.isLoggedIn = true;
                    return req.session.save((err) => {
                        console.log(err);
                        res.redirect("/");
                    });
                }
                res.redirect('/login');
            })
            .catch((err) => {
                console.log(err)
                res.redirect('/login');
            });
    })
};

exports.getSignup = (req, res, next) => {
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "Signup",
        isAuthenticated: false,
    });
};

exports.postSignup = (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    User.findOne({ email })
        .then((userDoc) => {
            if (userDoc) {
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
                    return res.redirect("/login");
                });
        })
        .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/login");
    });
};
