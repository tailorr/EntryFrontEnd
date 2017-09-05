const express = require('express');
const router = express.Router();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser((user, done) => {
    console.log('---serializeUser---')
        // console.log(user)
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    console.log('---deserializeUser---')
    done(null, obj);
});



passport.use(new GitHubStrategy({
        clientID: '35a35302ee7ed628fb10',
        clientSecret: 'd85424273113be0d4271fdda62eecb6decc797f1',
        callbackURL: "http://127.0.0.1:5000/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        // });
        done(null, profile);
    }
));


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        res.redirect('/');
        res.send({ username: req.session.user.username })
    });


module.exports = router;