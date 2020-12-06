const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const localStrategy = require('passport-local').Strategy;
const crypto = require('./cryptoFunction.js');


// const models = require('../models');

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SECRET'
},

    function (jwtPayload, cb) {
        if (!jwtPayload) {
            return cb(err)
        }
        return cb(null, jwtPayload);
    }
))

//Create a passport middleware to handle user registration
passport.use('register', new localStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const salt = crypto.genRandomString(16); /** Gives us salt of length 16 */
        const passwordData = crypto.sha512(password, salt);
        const formData = req.body;

        const neededKeys = ['telegramId', 'storeId', 'subUnitId', 'email', 'superiorTId'];

        if (username != null &&
            username != undefined &&
            password != null &&
            password != undefined) {

            formData.password = passwordData.passwordHash
            formData.salt = salt;
            formData.timeCreated = dateTime;

            // Create a new user
            models.users
                .create(formData)
                .then(result => {
                    return done(null, {
                        error: false,
                        data: {},
                        message: "User " + username + " has been created"
                    });
                })
                .catch((err) => {
                    console.log(err)
                    return done(null, {
                        error: true,
                        data: {},
                        message: "Error occured creating user"
                    });
                });
        } else {
            return done(null, {
                error: true,
                data: {},
                message: "Required fields needed are not entered"
            });
        }
    } catch (error) {
        console.log(error);
        return done(null, {
            error: true,
            data: {},
            message: "Error occured creating user"
        });
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({}, async (username, password, done) => {
    try {
        if (username != null &&
            username != undefined &&
            password != null &&
            password != undefined) {

            models.users.findOne({
                where: {
                    username: username
                }
            }).then(result => {
                if (result !== undefined && result !== null) {
                    if (result.length != 0) {
                        const values = result.dataValues;
                        if (values.password == crypto.sha512(password, values.salt).passwordHash) {
                            const user = {
                                username: values.username,

                            }

                            return done(null, user, {
                                error: false,
                                data: {},
                                message: 'Logged In'
                            });
                        }
                        else {
                            return done(null, false, {
                                error: true,
                                data: {},
                                message: 'Wrong Password'
                            });
                        }
                    } else {
                        return done(null, false, {
                            error: true,
                            data: {},
                            message: 'User does not exist'
                        });
                    }
                } else {
                    return done(null, false, {
                        error: true,
                        data: {},
                        message: 'User does not exist'
                    });
                }
            }).catch((err) => {
                console.log(err)
                return done(null, false, {
                    error: true,
                    data: {},
                    message: "Error occured trying receive user"
                });
            });
        } else {
            return done(null, {
                error: true,
                data: {},
                message: "Required fields needed are not entered"
            });
        }
    } catch (error) {
        console.log(error)
        return done(null, false, {
            error: true,
            data: {},
            message: 'Error occured'
        });
    }
}));