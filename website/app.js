const express = require("express");
const passport = require('passport');
const session = require('express-session');
const bodyparser = require('body-parser');
const { Strategy } = require('passport-discord');
const path = require('path');
const app = express();
const port = 3000;

module.exports.run = (jerry) => {
    passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((obj, done) => done(null, obj));

	const scopes = ['identify', 'guilds'];
  
	passport.use(new Strategy({
		clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `http://localhost:${port}/login`,
		//callbackURL: process.env.development ? process.env.DOMAIN : `http://localhost:${port}`+'/login',
		scope: scopes,
	}, function (accessToken, refreshToken, me, done) {
		process.nextTick(() => done(null, me));
	}));

    app
		.use(bodyparser.json())
		.use(bodyparser.urlencoded({ extended: true }))
		.engine('html', require('ejs').renderFile)
		.use(express.static(path.join(__dirname + '/public')))
		.set('view engine', 'ejs')
		.use(async function(req, res, next) {
			req.bot = jerry;
			next();
		})
		.use(session({
			secret: 'jerry dashboard',
			resave: false,
			saveUninitialized: false,
		}))
		.use(passport.initialize())
        .use(passport.session());
        
        app.get('/', function (req, res) {
			Render(jerry, req, res, 'index', {
				invite: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=0`,
			});
		})


        function CheckAuth(req, res, next) {
            if (req.isAuthenticated()) return next();
            else {
                return res.redirect('/login');
            }
        }
    
        app.listen(port, function (err) {
            if (err) return console.log(err);
            console.log(`Dashboard connected on port: ${port}`);
        });

        /**
	 * Render a template
   	 * @param {*} bot - server bot client
	 * @param {Request} req - Request object
	 * @param {Response} res - Response object
	 * @param {string} template - template name
	 * @param {Object} data - data object
	 * @param {Object} title - title data
	 * @param {boolean} [title.extend] - to extend base title
	 * @param {string} [title.title] - overwrite base title
	 */
	function Render(jerry, req, res, template, data = {}, title = {}) {
		let renderTitle;
		if (title.title && title.extend) renderTitle = `${jerry.user.username} - ${title.title}`;
		else if (title.title && !title.extend) renderTitle = title.title;
		else renderTitle = jerry.user.username;
		const BaseData = {
			status: req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : 'Login',
			login: req.isAuthenticated() ? 'oui' : 'non',
			title: renderTitle,
			jerry: jerry.user,
			user: req.user,
		};
		res.render(__dirname + '/views/' + template, Object.assign(BaseData, data));
  }
  
}