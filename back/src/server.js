/*require('@babel/register')({
    presets: [ 'env' ]
});*/

//const cookieSession = require('cookie-session');
//const expressSession = require('express-session');
const express = require( 'express' );
//const cors = require('cors');
const app = express();

app.disable('x-powered-by');

/*app.use( expressSession({
    name: 'expressSession',
    secret: 'ok... This is the secret!!! :0',
    resave: false,
    saveUninitialized: false,
    /*proxy: undefined,
    rolling: true,
    cookie: { 
        secure: false,
        httpOnly: false
     }
  }));*/


/*app.use( cookieSession( {
    name: 'sessionTest',
    keys: ['ok... This is the secret!!! :0'],
    secure: false
} ) );


const corsOptions = {
    origin: function(origin, callback) {
        const whitelist = ['http://localhost:8080', 'http://localhost:8081' ];
        console.log( 'Origem: ' + origin );
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}*/

app.use(express.json());
//app.use( cors( corsOptions ) );

app.use( '/user', require( './user/user.route.open' ) );
app.use( '/user', require( './user/user.route' ) );
app.use( '/home', require( './home/home.route' ) );
app.use( '/balance', require( './balance/balance.route' ) );

/**
 * Para mudar a porta alterar o valor da variável de ambiente no SO, ex.:
 * SET PORT=8081
 */
app.listen( process.env.PORT || 8081 );
