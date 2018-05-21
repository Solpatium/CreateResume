const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const logger = require('./logger');
const User = require('./db').User
const provider = 'linkedIn';


function addAuthentication(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        const data = user._json;
        const query = {id: data.id};
        const positions = data.positions.values.map(p => ({
            company: p.company.name,
            isCurrent: p.isCurrent,
            startDateMonth: p.startDate.month,
            startDateYear: p.startDate.year,
            endDateMonth: p.endDate ? p.endDate.month : null,
            endDateYear: p.endDate ? p.endDate.year : null
        }));
        const update = {
            id: data.id,
            provider: 'linkedin',
            name: data.firstName,
            surname: data.lastName,
            email: data.emailAddress,
            picture: data.pictureUrl,
            positions: positions
        }
        User.findOneAndUpdate(query, update, {upsert: true, new: true}, function(error, result) {
            done(error, data.id);
        });
    });
      
    passport.deserializeUser(function(id, done) {
        User.findOne({id: id}, function(error, result) {
            done(error, result);
        })
    });

    const strategy = new LinkedInStrategy({
        authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
        tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}:${process.env.APP_PORT}/login/${provider}/callback`,
        scope: ['r_basicprofile', 'r_emailaddress'],
        state: true,        
    },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    );

    passport.use(provider, strategy);

    app.get(`/login/${provider}`, passport.authenticate(provider));

    app.get(
        `/login/${provider}/callback`,
        passport.authenticate(provider, {
            successRedirect: `${process.env.APP_URL}:${process.env.CLIENT_PORT}`,
            failureRedirect: `/login/${provider}`
        }));
}

module.exports = addAuthentication;