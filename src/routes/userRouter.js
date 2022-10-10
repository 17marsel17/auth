import express from 'express';
import passport from 'passport';

export const router = express.Router();

router.get('/auth/yandex',
    passport.authenticate('yandex'),
    function (req, res) {
    });

router.get('',
    (req, res) => {
    res.render('index', {user: req.user})
    })

router.get('/auth/yandex/callback',
    passport.authenticate('yandex', {failureRedirect: '/login'}),
    function (req, res) {
    res.redirect('/profile')
    })

router.get('/login', (req, res) => {
    res.render('login', {message: req.flash('message')});
});

router.get('/profile', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
    },
    (req, res) => {
        res.render('profile', {user: req.user});
    }
);

router.post('/login', passport.authenticate('yandex', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/login')
    })
});