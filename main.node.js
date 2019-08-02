require('babel-register')({
    presets: [ 'env' ]
});

const express = require( 'express' );
const cors = require('cors');
const session = require('express-session')

const app = express();
app.use(express.json());
app.use( cors() );
app.use(session({
    cookieName: 'session',
    secret: 'ok... This is the secret!!! :0',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

app.use( '/user', require( './back/user/user.route.open' ) );
app.use( '/user', require( './back/user/user.route' ) );
app.use( '/home', require( './back/home/home.route' ) );


/**
 * Para mudar a porta alterar o valor da variável de ambiente no SO, ex.:
 * SET PORT=8081
 */
app.listen( process.env.PORT || 8081 );
