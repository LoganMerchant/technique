// Import dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

// Import files
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Set up a session
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'supersecretthing',
    cookie: {
        maxAge: 600000

    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Setup express
const app = express();
const PORT = process.env.PORT || 3001;

// Setup the Handlebars templating engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// Turn on the routes
app.use(routes);

// Turn on the connect to the db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
})