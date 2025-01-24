
require("dotenv").config();
const passport = require("passport");
const crypto = require('crypto');
const randomPassword = (byte = 32) => crypto.randomBytes(byte).toString('hex');

const { UserModel } = require("../models/user.model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.googleclientid,
    clientSecret: process.env.googleclientsecret,
    callbackURL: `${process.env.SERVER_URL}/api/user/auth/google/callback`
}, async function (accessToken, refreshToken, profile, cb) {

    try {

        let email = profile._json.email;
        const user = await UserModel.findOne({ email });

        if (!user) {
            let newuser = new UserModel({
                email: email,
                name: profile._json.name,
                password: randomPassword()
            })

            await newuser.save()
            return cb(null, newuser)
        } else {
            return cb(null, user)
        }
    } catch (error) {
        console.log(error)
    }
    console.log("User profile received:-", profile)
}));


module.exports = { passport }
