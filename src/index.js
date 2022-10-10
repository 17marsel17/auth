import express from 'express';
import { PORT } from './config.js';
import { router as userRouter } from './routes/userRouter.js';
import { logger } from './middleware/logger.js';
import { error } from './middleware/error.js';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import {initPassport} from './passport/init.js';
import flash from 'connect-flash';

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));

app.use(logger);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

initPassport(passport);

app.use('/', userRouter);

app.use(error);

async function start(PORT) {
    try {
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start(PORT);
