import { UserModel } from "../model/user.js";
import {signup} from './signup.js';
import {login} from './login.js';
import {Strategy as YandexStrategy} from 'passport-yandex';

export const initPassport = function(passport) {

    passport.serializeUser(function(user, done) {
        // console.log('serializing user: ', user);
        // done(null, user._id);
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        // UserModel.findById(id, function(err, user) {
        //     console.log('deserializing user: ', user);
        //     done(err, user);
        // });
        done(null, obj);
    }); 

    //login(passport);
    //signup(passport);

    passport.use(new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/yandex/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(() => {
                return done(null, profile)
            });
        }
        ));
}